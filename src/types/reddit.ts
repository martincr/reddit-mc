export interface RedditPost {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  subreddit_name_prefixed: string;
  score: number;
  upvote_ratio: number;
  num_comments: number;
  url: string;
  permalink: string;
  thumbnail: string;
  is_self: boolean;
  selftext: string;
  created_utc: number;
  domain: string;
  stickied: boolean;
  over_18: boolean;
  spoiler: boolean;
  flair_text: string | null;
}

export interface RedditListingChild {
  kind: "t3";
  data: RedditPost;
}

export interface RedditListing {
  kind: "Listing";
  data: {
    children: RedditListingChild[];
    after: string | null;
    before: string | null;
  };
}
