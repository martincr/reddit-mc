# reddit-mc

A minimal Reddit front page clone.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **React** with server components
- **Tailwind CSS v4**
- **Shadcn UI** (components live in `src/components/ui/`)
- **lucide-react** for icons

## Running the project

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout — mounts <Header />
│   └── page.tsx              # Home page — Suspense around <PostList />
├── components/
│   ├── Header.tsx            # Sticky header with Reddit alien SVG logo
│   ├── PostCard.tsx          # Single post (rank, score, thumbnail, meta, links)
│   ├── PostList.tsx          # Async server component — fetches & renders posts
│   └── PostListSkeleton.tsx  # 10-card loading skeleton shown during fetch
├── lib/
│   └── reddit.ts             # API client + formatScore / timeAgo / getThumbnailSrc helpers
└── types/
    └── reddit.ts             # RedditPost, RedditListing TypeScript types
```

## Reddit API

- **Endpoint:** `https://www.reddit.com/.json?limit=30&raw_json=1`
  Public unauthenticated JSON endpoint — no OAuth required for read-only data.
- **User-Agent:** Must be set; value: `web:reddit-mc:1.0.0 (educational clone)`
  Reddit requires a descriptive UA string: `<platform>:<app ID>:<version>`.
- **Rate limit:** 60 requests/minute unauthenticated.
  Responses are cached for **60 seconds** via `next: { revalidate: 60 }` to stay within limits.
- All post links open in a new tab with `rel="noopener noreferrer"`.
- Thumbnail images use a plain `<img>` tag (not `next/image`) — Reddit thumbnails come from varying domains, avoiding the need to whitelist them all in `next.config.ts`.

## Shadcn components installed

`button`, `badge`, `card`, `avatar`, `separator`, `skeleton`
