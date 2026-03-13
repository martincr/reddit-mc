import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
        {/* Reddit-style alien logo */}
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="10" fill="#FF4500" />
          <path
            d="M16.67 10c0-.82-.67-1.5-1.5-1.5-.41 0-.78.17-1.05.43-1.04-.7-2.47-1.15-4.05-1.2l.69-3.22 2.24.48c.02.56.49 1.01 1.06 1.01a1.07 1.07 0 000-2.14c-.42 0-.79.25-.98.61l-2.5-.53a.22.22 0 00-.26.17L9.55 7.7C7.94 7.73 6.48 8.18 5.43 8.9a1.49 1.49 0 00-1.06-.4 1.5 1.5 0 00-.75 2.8c-.02.16-.03.32-.03.48 0 2.44 2.87 4.42 6.41 4.42s6.41-1.98 6.41-4.42c0-.16-.01-.32-.03-.48.5-.27.84-.79.84-1.3zm-10.9 1a1.07 1.07 0 112.14 0 1.07 1.07 0 01-2.14 0zm5.97 2.82c-.73.73-2.14.79-2.74.79-.6 0-2.02-.06-2.74-.79a.24.24 0 01.34-.34c.46.46 1.49.62 2.4.62.91 0 1.93-.16 2.4-.62a.24.24 0 01.34.34zm-.18-1.75a1.07 1.07 0 110-2.14 1.07 1.07 0 010 2.14z"
            fill="white"
          />
        </svg>

        <span className="font-bold text-lg tracking-tight">reddit</span>

        <Separator orientation="vertical" className="h-5 mx-1" />

        <span className="text-sm text-muted-foreground">Top Posts</span>
      </div>
    </header>
  );
}
