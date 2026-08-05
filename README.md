<p align="center">
  <img src="public/logo_light.svg" alt="Logo" width="120">
</p>

<h1 align="center">Portfolio</h1>

<p align="center">
   <strong>Developer portfolio with a terminal-style black and white UI.</strong><br>
   <em>Built with Next.js 16 and Tailwind CSS 4.</em>
</p>

## Features

- Single-page scroll layout with anchor navigation
- Terminal-inspired UI with prompt aesthetics
- Blinking cursor and scroll-triggered fade-in animations
- Curated featured projects with a browsable archive
- Markdown blog, RSS feed, sitemap, and structured metadata
- Categorized skills from security to AI/ML
- Fully responsive and keyboard-accessible
- Self-hosted JetBrains Nerd Font

## Tech stack

- Framework: Next.js 16
- UI: React 19, Tailwind CSS 4
- Icons: Lucide React
- Font: JetBrains Nerd Font (self-hosted via `next/font/local`)
- Language: TypeScript
- Package manager: Bun

## Getting started

### Prerequisites

- Bun 1.3.14+
- Node 22.11.0 (see `.nvmrc`)
- A `GITHUB_TOKEN` in the environment. The Projects section is fetched from the
  GitHub GraphQL API at build time, and `bun run build` fails without it. A
  classic token with `public_repo` scope is enough.

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Project structure

```
app/            # Next.js App Router pages, layout, fonts and global styles
components/     # Reusable UI components (Nav, Caret, Reveal, icons)
sections/       # Page sections (Hero, About, Projects, Skills, Contact)
lib/            # Data loading (GitHub projects and contributions, markdown posts) and site constants
public/         # Logo SVGs and self-hosted font files
```

## Quality checks

```bash
bun test
bun run lint
bun run build
```
