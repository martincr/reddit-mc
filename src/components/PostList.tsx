"use client";

import { useEffect, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { PostListSkeleton } from "@/components/PostListSkeleton";
import type { RedditPost } from "@/types/reddit";

export function PostList() {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setPosts(data);
      })
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
