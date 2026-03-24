---
title: Blazor-based Rich Text Editor
preview_url: https://blazor-ui.taylorkelley.dev/rich-text
github_url: https://github.com/TaylorGKelley/Blazor-UI
---

> **Static Markdown-based blog with management via GitHub.**
> Versioned posts, easy management, SSG/ISG support for blazing fast load times

---

**Type:** Blazor Component Library (RCL)

**License:** MIT

**Tech Stack:** C# | Blazor | JavaScript

---

## Table of Contents

1. [The Why](#1-the-why)
2. [Core Features](#2-core-features)
3. [Key Technical Decisions](#3-key-technical-decisions)
4. [A Few Challenges I Faced](#4-a-few-challenges-i-faced)
5. [What I'd Do Differently](#5-what-id-do-differently)
6. [Outcomes & Takeaways](#6-outcomes-takeaways)

---

## 1. The Why

Without the extensive eco-system that React provides, Blazor was lacking a good component with Rich text editing capabilities, without the security concerns of using raw HTML with a content-editable element. So I set out to develop my own from scratch, using vanilla JS and raw C# to JS Interop. 

As a result I learned how deeply using a Virtual-DOM effects complex editors like this, and the fragility talking between languages can bring. While also creating an entire UI library to accompany the rich text input.

###### **The core requirements for an MVP:**
- Works in a SSR-based app, not WASM only
- An input element using contenteditable="true"
- Conquer V-DOM challenges and syncing data between languages
- XSS protection through object storage instead of raw HTML
- Custom function to render HTML instead of setting innerHTML properties

---

## 2. The Architecture

The library is structured around a hierarchy of base classes that components inherit from so that certain service injections and helper functions can be shared accross the library.

At the top sits `cErrorFunctions`, which handles error tracking and assembly metadata. Above that is `ComponentMain`, the workhorse base class that every component and page inherits from. It injects the core services like `IJSRuntime`, `NavigationManager`, `cToastService`, and `cApplicationState` so no component ever has to declare them individually.

```
cErrorFunctions
    └── ComponentMain
            ├── cBindingValue<TValue>
            │       └── InputMain<TValue>
            │               └── TextInput, SelectInput, DateInput, RichTextInput, etc.
            └── All UI Components (RichTextInput, Modal, Popover, Table, etc.)
```

`InputMain<TValue>` extends `cBindingValue<TValue>`, which handles the two-way binding pattern (`Value` / `ValueChanged`) that makes `@bind-Value` work without having to set it up for each component. Each input registers itself with the nearest `<Form />` via a `cFormState` cascading value, enabling centralized validation on submit without any manual wiring.

The JavaScript integration follows a consistent pattern throughout: rather than importing individual JS modules per component, due to some issues in .Net 6 RCL's not storing wwwroot files, all JS is executed through a globally registered `js()` function injected into the document body on first render. This function accepts a raw code string and any parameters to extend the functionality of the basic `eval()` function, keeping JS collocated with the C# that needs it and avoiding module import issues.

```javascript
// The global js() evaluator registered by ComponentMain
function js(strJSCode, ...parameters) {
    const code = eval(`(...params) => { ${strJSCode} }`);
    return code(...parameters);
}
```

---

## 3. Core Features

####  Rich Text Editor

The `<RichTextInput />` is the most complex piece in the library. Rather than storing raw HTML, it stores a structured `List<cRichTextBlock>` working as a typed object graph of block types (body, headings, bullet lists, blockquotes, images) and inline text nodes (with bold, italic, underline, and link metadata). This makes the data safe to store in a database, easy to sanitize, and straightforward to render back out as HTML or Blazor elements.

The editor itself is a fully custom contenteditable implementation in JavaScript. It manages cursor placement, inline style ranges, block type switching, bullet list indentation, image insertion with resizing handles, and paste handling, all coordinated back to Blazor via `JSInvokable` methods and serialized to JSON for XSS prevention.

Rendering stored content is handled by two static methods: `fncRenderContent()` returns a `RenderFragment` for use directly in Razor pages, and `fncRenderContentAsHTML()` returns a raw HTML string for cases where Blazor isn't used

```razor
@* In a blog post view *@
@RichTextInput.fncRenderContent(fobjPost.malobjContent)
```

#### Form & Input System

Every input inherits from `InputMain<TValue>` and uses `<InputContainer />` to render the surrounding label, error message, and styling automatically and keeping a uniform look across the input components. Inputs register a `subRunValidation` delegate with the parent `<Form />` tag, which then calls all of them on submit, collects any thrown exceptions as error messages, and blocks submission if any fail. Custom validation is layered on top via `OnValidate` and `OnValidateAsync` callbacks on the `<Form />` itself.

```razor
<Form OnValidate=@subHandleValidation OnSubmit=@subHandleSubmit>
    <TextInput Label="Name" Required @bind-Value=@fobjForm.mstrName />
    <TextAreaInput Label="About" MaxLength="200" @bind-Value=@fobjForm.mstrAbout />
    <PhoneNumberInput Label="Phone" @bind-Value=@fobjForm.mintPhoneNumber />
    <SubmitButton>Save</SubmitButton>
</Form>
```

The `<Select />` component supports both single and multi-select, an optional select-all toggle, and a searchable filter - all built on the custom `<Popover />` component rather than a native `<select>`, so it can be fully styled.

#### Data Table

The `<Table />` component is generic over `TData` and accepts `<Column />` and `<ActionColumn />` child components to define its structure. Column widths are auto-calculated by measuring actual DOM content widths via JS on first render, and each column is independently resizable via drag. Sorting is handled by reflection on the `TData` property name bound to each column, and virtualization via Blazor's `<Virtualize />` keeps large datasets performant.

---

## 4. Key Technical Decisions

**Inheritance over composition for base classes.** Using `ComponentMain` as an inherited base rather than injected services kept component code clean. The tradeoff is that it ties components to the inheritance chain, but for a single-purpose UI library targeting one framework version, the ergonomics win.

**Structured data in the rich text editor.** Storing `List<cRichTextBlock>` instead of raw HTML was the right call for the blog project specifically. It meant content could be validated, transformed, and rendered server-side without any HTML parsing or sanitization libraries. The image data is stored separately in a `Dictionary<string, string>` keyed by a generated image ID, with only the ID persisted in the block data - keeping large base64 strings out of the main content payload.

**The global `js()` evaluator.** Importing JS modules in Blazor SSR is unreliable on first render because the JS runtime may not be fully available. Injecting a single script tag and routing all JS through one globally available function eliminated an entire category of timing bugs, at the cost of losing the module system's scoping guarantees. For a component library where JS is an implementation detail rather than the main product, that tradeoff was acceptable.

**Scoped `cApplicationState` as a lightweight store.** For the auth project, user session state (current user, permissions) needed to be accessible across components without prop-drilling. `cApplicationState` handled this cleanly with typed get/set helpers. It's not a reactive store - components have to subscribe to `OnChange` manually - but it was enough for the use cases it served.

---

## 5. A Few Challenges I Faced

**Blazor's DOM reconciliation vs. the contentEditable.** Blazor's virtual DOM want's to own any content with dynamic values, making a solution to manage each DOM element and populated data via Blazor impossible, as the `contentEditable` would then throw it out of sync with the Virtual DOM. The solution was to embed all logic related to the `contentEditable` in JavaScript to avoid any issues with Blazor's syncing entirely.

---

## 6. What I'd Do Differently

**Target .NET 8+ from the start.** The library originally targeted .NET 6 SSR based projects, which means certain Blazor features like streaming rendering, enhanced navigation, and the new `@rendermode` directive were not an option. The JS timing workarounds in particular would be significantly cleaner with .NET 8's improved component lifecycle model, being able to call the data sync in `OnParametersSetAsync` instead to keep extra logic out of the way and detect if values were changed on the Blazor side.

**Separate the rich text editor into its own package.** It's the most complex component by a large margin, with its own class hierarchy, and several thousand lines of JS. Bundling it with the rest of the UI library made the library heavier than it needed, while also making it more error prone with dependencies on the Modal and other elements.

---

## 7. Outcomes & Takeaways

After 3 different re-writes due to Virtual-DOM issues, I learned that complex interactions should be left to JavaScript to run natively in the bowser, not abstracted away into a framework with separate languages. Despite the struggles of writing it, the end product is a fully functional and easy to work with component library that keeps all UI elements looking similar and functioning well.

Though this library may not be used often, I've been able to walk away with a full understanding of how Virtual-DOM's work together with the browser DOM, how JS can talk back to other languages through JSInterop, and learning how to serialize html into an object based data source for easy sanitization.
