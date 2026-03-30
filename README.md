# Personal Site

A personal portfolio and blog built with Next.js 16, React, and Tailwind CSS. Features a markdown-based blog powered by a GitHub repository, project case studies, a contact form, and smooth motion transitions.

**Live site:** [taylorkelley.dev](https://taylorkelley.dev)

---

## Features

- **Portfolio** — Highlighted projects with descriptions, live previews, and detailed case-study pages rendered from local markdown files
- **Blog** — Posts are fetched at build time from a separate [GitHub repository](https://github.com/TaylorGKelley/personal-blog), parsed with gray-matter, and rendered with syntax-highlighted code blocks
- **Contact form** — Server action that sends email via the Mailtrap API
- **Animated UI** — Intro loader, nav overlay, and text-shuffle effects powered by Motion (Framer Motion)
- **Markdown renderer** — Custom components for headings, code blocks (Prism syntax highlighting), images, and links

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React, Tailwind CSS |
| Animation | Motion (Framer Motion) |
| Markdown | `@m2d/react-markdown`, remark-gfm, rehype-highlight |
| Email | Mailtrap |
| Language | TypeScript 5 |

## Getting Started

### Prerequisites

- Node.js

### Installation

```bash
pnpm install
```

### Environment Variables

Copy the example env file and fill in your values:

```bash
cp .example.env .env.local
```

| Variable | Description |
|---|---|
| `MAILTRAP_API_KEY` | API key for the Mailtrap email service |
| `GITHUB_ACCESS_TOKEN` | *(Optional)* Personal access token to increase GitHub API rate limits for blog post fetching |

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
pnpm build
pnpm start
```

## Blog

Blog posts are fetched from the [`TaylorGKelley/personal-blog`](https://github.com/TaylorGKelley/personal-blog) repository at build time (or on-demand with a 5-minute revalidation window). Posts are markdown files with frontmatter:

```yaml
---
title: My Post Title
description: A short summary.
date: 2025-01-15
youtube_url: https://youtube.com/embed/...
tags: [typescript, nextjs]
---
```

To draft a post without publishing it, keep it on a non-`main` branch in the blog repo.

## Adding a Project

1. Add an entry to `src/data/info.config.ts` under `projects`.
2. Create a corresponding markdown file at `public/projects/<slug>.md` with frontmatter:

```yaml
---
title: Project Name
preview_url: https://example.com
github_url: https://github.com/...
---
```

The first project in the array is rendered as the featured/highlighted card on the home page.

## License

[MIT](./LICENSE) © 2026 Taylor Kelley
