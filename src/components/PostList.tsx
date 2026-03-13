import { PostCard } from "@/components/PostCard";
import { getTopPosts } from "@/lib/reddit";

export async function PostList() {
  const posts = await getTopPosts(30);

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} rank={index + 1} />
      ))}
    </div>
  );
}
