import type { RedditListing, RedditPost } from "@/types/reddit";

// Reddit API rules:
// - Use a descriptive User-Agent: <platform>:<app ID>:<version> (by /u/<username>)
// - Do not exceed 60 requests/minute for unauthenticated requests
// - We use the public .json endpoint (no OAuth required for read-only public data)
const USER_AGENT = "web:reddit-mc:1.0.0 (educational clone)";

export async function getTopPosts(limit = 30): Promise<RedditPost[]> {
  const res = await fetch(
    `https://www.reddit.com/.json?limit=${limit}&raw_json=1`,
    {
      headers: {
        "User-Agent": USER_AGENT,
      },
      // Cache for 60 seconds to stay within rate limits
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Reddit API error: ${res.status} ${res.statusText}`);
  }

  const data: RedditListing = await res.json();
  return data.data.children.map((child) => child.data);
}

export function formatScore(score: number): string {
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}k`;
  }
  return score.toString();
}

export function timeAgo(utcSeconds: number): string {
  const now = Date.now() / 1000;
  const diff = now - utcSeconds;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}

export function getThumbnailSrc(post: RedditPost): string | null {
  const { thumbnail } = post;
  if (!thumbnail || thumbnail === "self" || thumbnail === "default" || thumbnail === "nsfw" || thumbnail === "spoiler") {
    return null;
  }
  // Reddit sometimes returns "image" as the thumbnail value for external links without a real thumbnail
  if (thumbnail === "image") return null;
  // Must be a valid URL
  try {
    new URL(thumbnail);
    return thumbnail;
  } catch {
    return null;
  }
}
