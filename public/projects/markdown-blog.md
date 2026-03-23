---
title: Static Markdown-based Blog
preview_url: https://taylorkelley.dev/blog
github_url: https://github.com/TaylorGKelley/personal-site
---

> **Static Markdown-based blog with management via GitHub.**
> Versioned posts, easy management, SSG/ISG support for blazing fast load times

---

**Type:** SSG/ISR - NextJS site

**License:** MIT

**Tech Stack:** TypeScript | Next JS | GitHub

---

## Table of Contents

1. [The Why](#1-the-why)
2. [The Architecture](#2-the-architecture)
3. [Core Features](#3-core-features)
4. [Key Technical Decisions](#4-key-technical-decisions)
5. [A Few Challenges I Faced](#5-a-few-challenges-i-faced)
6. [What I'd Do Differently](#6-what-id-do-differently)
7. [Outcomes & Takeaways](#7-outcomes-takeaways)

---

## 1. The Why

Being a web developer, I knew I should code my own blog - but deciding how to manage posts led me to two competing options. On one hand, I could use or build a custom Content Management System (CMS), where users could leave comments and posts could be managed via a database for faster lookup times. On the other hand, being a personal blog, I really didn't need comments or post interactions, and statically rendered pages would make for much better performance.

Managing the blog via Markdown files was appealing, but it came with a catch: I'd have to republish the site every time a new post was made, or store files elsewhere like a cloud storage server. That's when the solution clicked - sync posts to a GitHub repository and make API calls to that repo whenever the pages are re-rendered.

This gave me an easy CMS-like system where I could:

- Manage posts in a familiar environment (GitHub and Obsidian for editing)
- Create branches for draft posts I didn't want published yet
- Have a clean, consistent API to call when statically rendering pages
- Never worry about a database or extra hosting costs

###### **The core requirements for an MVP:**

- Fetch post slugs and content from a GitHub repository at build/revalidation time
- Parse Markdown frontmatter for post metadata (title, date, description, YouTube URL)
- Render Markdown content with syntax highlighting and custom react components
- Support Incremental Static Regeneration (ISR) so new posts appear without a full redeploy of the app

---

## 2. The Architecture

The blog is structured around a simple data flow: GitHub → fetch utilities → Next.js page → rendered Markdown.

![Site Structure](/projects/images/site-structure-blog.jpeg)
```
GitHub Repo (personal-blog)
  └── posts/
        ├── post-one.md
        └── post-two.md
            ↓  (GitHub raw content API)
  fetchPostSlugs()  →  list of slugs
  fetchPost()       →  parsed Post object { title, date, content, ... }
            ↓
  Next.js App Router (ISR, revalidate: 300s)
  /blog           →  BlogPage   (slug list + recent post hero)
  /blog/[slug]    →  PostPage   (full post content)
            ↓
  <RenderMarkdown>  →  @m2d/react-markdown + rehype-highlight
```

Two utility functions handle all GitHub communication:

- `fetchPostSlugs` - queries the GitHub contents API to list `.md` files in the `posts/` directory of the repo
- `fetchPost` - fetches the raw file content and converts image paths to github image url's so that they can be streamed in properly

Both pages use `export const revalidate = 300`, giving the site fresh content every 5 minutes without a full rebuild.

---

## 3. Core Features

#### GitHub as the CMS

Posts live in a separate `personal-blog` repository under a `posts/` directory. The main site never stores post content locally as it pulls everything fresh from GitHub's raw content API on each ISR cycle (around 5 minutes). This means publishing a new post is as simple as merging a pull request, while drafts can stay on branches and never appear on the live site until it's time.

#### Frontmatter-driven Metadata

Each post is a standard Markdown file with a YAML frontmatter block parsed by the `gray-matter` package:

```markdown
---
title: Sample Post Title
description: A short summary shown on the blog index.
date: 2025-06-01
youtube_url: https://www.youtube.com/watch?v=abc123
tags: [nextjs, typescript]
---

<!-- Post content starts here... -->
```

#### Rich Markdown Rendering

Posts are rendered using `@m2d/react-markdown` (a server-side compatible Markdown renderer) with a suite of custom react components:

- **Headings** (`h1`–`h6`) - auto-generate anchor IDs and render as deep-linkable `<Link>` elements
- **Code blocks** - powered by `react-syntax-highlighter` with the One Dark theme
- **Images** - wrapped in Next.js `<Image>` for optimized delivery, with caption support via alt text and configured to support caching in the `next.config.js`
- **Blockquotes, links, lists** - all styled consistently with the site's design system

#### Blog Index with Recent Post Hero

The blog index page (`/blog`) fetches all slugs, resolves each post in parallel, and splits the result into a featured "recent post" hero and a list of previous posts. Each entry shows a YouTube thumbnail which is pulled from the `img.youtube.com` API alongside the posts title, description, date, and estimated reading time that is set in the front-matter metadata.

#### Reading Time Estimation

A lightweight `calculateTimeToRead` utility strips non-alphabetic characters, splits on whitespace, and divides by 200 words-per-minute to give readers a quick at-a-glance estimate on how long the post is.

---

## 4. Key Technical Decisions

#### Relative Image Path Rewriting

Posts in the `personal-blog` repo reference images with relative paths like `content/images/photo.jpg` so that editors like Obsidian can display the images properly. Before parsing the Markdown, `fetchPost` rewrites these paths to absolute GitHub raw URLs using a regex replace, allowing for the images to be managed alongside posts within GitHub.

#### Incremental Static Regeneration over Full SSR

Rather than fetching from GitHub on every request, both `/blog` and `/blog/[slug]` use ISR with a 5-minute revalidation window. This gives the performance characteristics of a static site while still surfacing new posts quickly after merge, along with limiting the amount of requests that are made to the GitHub api, to avoid any rate-limit errors.

#### `generateStaticParams` for Pre-rendering Known Slugs

The `[slug]` page uses `generateStaticParams` to pre-render all known posts at build time. Unknown slugs fall through to on-demand ISR rather than `404`-ing immediately,

#### `@m2d/react-markdown` for Server Component Compatibility

Standard `react-markdown` requires client-side rendering. `@m2d/react-markdown` is a drop-in that works inside React Server Components, keeping the rendering pipeline fully server-side and avoiding unnecessary JavaScript being sent to the browser.

---

## 5. A Few Challenges I Faced

#### Challenge: Relative image paths breaking in production

Posts authored with relative image paths like `content/images/photo.jpg` rendered fine locally when the markdown was served from the same directory, but broke completely when fetched from GitHub as the images were in a different scope than the `<Image>` component.

**Solution:** `fetchPost` runs a regex replacement that rewrites any occurrence of the relative `content/images/` path prefix to the full `raw.githubusercontent.com` URL for that repo and branch. This allows there to be relative image paths that work while editing, with images that still load on the main site.

#### Challenge: Heading IDs conflicting with special characters

The custom heading components generate anchor IDs from the heading text. Punctuation, emoji, and non-ASCII characters caused malformed IDs that broke deep links.

**Solution:** The `formatId` utility strips everything that isn't alphanumeric or a space, trims whitespace, lowercases the result, and replaces spaces with hyphens, producing clean, URL-safe IDs regardless of what the heading contains. This allows for a table of content section to link to an Id like `#a-test-header` letting the page automatically jump to the `A Test Header` section.

---

## 6. What I'd Do Differently

**Add a GitHub webhook for instant revalidation.** The current 5-minute ISR window means a newly merged post can take up to 5 minutes to appear. A simple Next.js API route that accepts a GitHub webhook payload and calls `revalidatePath('/blog')` would make new posts appear within seconds of merge.

**Paginate the blog index.** Currently, all posts are fetched and rendered on a single page. As the post count grows, this could become hard to manage and make too many api requests to the GitHub API. Implementing better caching or ISR features could help to speed up re-renders and make it less error-prone

---

## 7. Outcomes & Takeaways

Building a GitHub-backed blog taught me just how far you can get without a database when you design around the right constraints. While it is limiting, the GitHub API is surprisingly capable as a content backend, handling post versioning, access control (branches to created post drafts without being publicly visible), and content delivery. This let me avoid having authentication solely for commenting or liking posts, or needing to create CMS pages for admins to post with.

#### What I came away with

- A practical understanding of **Incremental Static Regeneration** and when it's the right tool versus full SSR or pure static generation
- Experience building a **custom Markdown rendering pipeline** with React Server Components, including component overrides, syntax highlighting, and image optimization and caching
- Appreciation for the **power of frontmatter as a schema** - keeping metadata co-located with content eliminates an entire class of sync bugs you'd otherwise get with a separate CMS
- A deeper feel for the **trade-offs of CMS-free content management**: the simplicity is real, but so are the limits (no search, no comments, no rich media upload UI)

---

## Links

- **GitHub:** [github.com/TaylorGKelley/personal-site](https://github.com/TaylorGKelley/personal-site)
- **Preview:** [taylorkelley.dev/blog](https://taylorkelley.dev/blog)
