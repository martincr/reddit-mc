import { ArrowUp, MessageSquare, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { RedditPost } from "@/types/reddit";
import { formatScore, timeAgo, getThumbnailSrc } from "@/lib/reddit";

interface PostCardProps {
  post: RedditPost;
  rank: number;
}

export function PostCard({ post, rank }: PostCardProps) {
  const thumbnail = getThumbnailSrc(post);
  const postUrl = `https://www.reddit.com${post.permalink}`;
  const linkUrl = post.is_self ? postUrl : post.url;

  return (
    <Card className="hover:bg-muted/30 transition-colors">
      <CardContent className="p-0">
        <div className="flex gap-2.5 px-3 py-2.5">
          {/* Rank + Score */}
          <div className="flex flex-col items-center gap-0.5 min-w-8 text-center">
            <span className="text-[10px] text-muted-foreground font-medium leading-none">{rank}</span>
            <ArrowUp className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-semibold text-orange-500 leading-none">
              {formatScore(post.score)}
            </span>
          </div>

          {/* Thumbnail */}
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbnail} alt="" className="w-12 h-12 object-cover rounded bg-muted" />
            ) : (
              <div className="w-12 h-12 rounded bg-muted" />
            )}
          </a>

          {/* Content */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground leading-none">
              <a
                href={`https://www.reddit.com/${post.subreddit_name_prefixed}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:underline"
              >
                {post.subreddit_name_prefixed}
              </a>
              <span>·</span>
              <span>u/{post.author}</span>
              <span>·</span>
              <span>{timeAgo(post.created_utc)}</span>
            </div>

            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm leading-snug hover:text-orange-500 transition-colors line-clamp-2"
            >
              {post.title}
            </a>

            <div className="flex flex-wrap items-center gap-1.5">
              {post.flair_text && (
                <Badge variant="secondary" className="text-[10px] py-0 h-4 px-1.5">
                  {post.flair_text}
                </Badge>
              )}
              {post.over_18 && (
                <Badge variant="destructive" className="text-[10px] py-0 h-4 px-1.5">
                  NSFW
                </Badge>
              )}
              {!post.is_self && (
                <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                  <ExternalLink className="w-2.5 h-2.5" />
                  {post.domain}
                </span>
              )}
              <a
                href={postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors ml-auto"
              >
                <MessageSquare className="w-3 h-3" />
                {post.num_comments.toLocaleString()}
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
