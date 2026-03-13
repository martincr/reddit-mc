"use client";

import { useEffect, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { PostListSkeleton } from "@/components/PostListSkeleton";
import type { RedditListing, RedditPost } from "@/types/reddit";

export function PostList() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://www.reddit.com/.json?limit=30&raw_json=1")
      .then((res) => {
        if (!res.ok) throw new Error(`Reddit API error: ${res.status} ${res.statusText}`);
        return res.json() as Promise<RedditListing>;
      })
      .then((data) => setPosts(data.data.children.map((c) => c.data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PostListSkeleton />;
  if (error) return <p className="text-sm text-muted-foreground">Failed to load posts: {error}</p>;

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} rank={index + 1} />
      ))}
    </div>
  );
}
