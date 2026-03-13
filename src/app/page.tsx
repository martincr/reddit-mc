import { Suspense } from "react";
import { PostList } from "@/components/PostList";
import { PostListSkeleton } from "@/components/PostListSkeleton";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <Suspense fallback={<PostListSkeleton />}>
        <PostList />
      </Suspense>
    </main>
  );
}
