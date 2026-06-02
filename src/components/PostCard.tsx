import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover?: string | null;
  views: number;
  likes: number;
  createdAt: Date;
  category: "TECH" | "LIFE";
}

export default function PostCard({
  title,
  slug,
  excerpt,
  cover,
  views,
  likes,
  createdAt,
  category,
}: PostCardProps) {
  const href = category === "TECH" ? `/tech/${slug}` : `/life/${slug}`;

  return (
    <Link href={href} className="panel-card block group">
      <div className="flex items-start gap-4">
        {cover && (
          <span className="text-4xl shrink-0 group-hover:scale-110 transition-transform">
            {cover}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="mt-2 text-sm text-slate-500 line-clamp-2">{excerpt}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span>{formatDate(createdAt)}</span>
            <span className="flex items-center gap-1">
              👁 {views}
            </span>
            <span className="flex items-center gap-1">
              ❤️ {likes}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
