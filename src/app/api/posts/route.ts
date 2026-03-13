import { NextResponse } from "next/server";
import { getTopPosts } from "@/lib/reddit";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getTopPosts(30);
    return NextResponse.json(posts);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
