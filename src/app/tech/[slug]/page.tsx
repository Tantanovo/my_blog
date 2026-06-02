import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { formatDate, categoryLabel } from "@/lib/utils";
import PostInteractions from "@/components/PostInteractions";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string, category: "TECH" | "LIFE") {
  return prisma.post.findFirst({
    where: { slug, category, published: true },
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug, "TECH");
  return { title: post ? `${post.title} | 杨子业的博客` : "文章未找到" };
}

export default async function TechPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug, "TECH");
  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/tech"
        className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 mb-6"
      >
        ← 返回{categoryLabel("TECH")}
      </Link>

      <header className="mb-8">
        {post.cover && (
          <span className="text-5xl block mb-4">{post.cover}</span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span>{formatDate(post.createdAt)}</span>
          <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded-md text-xs font-medium">
            {categoryLabel("TECH")}
          </span>
        </div>
      </header>

      <div className="prose prose-slate max-w-none mb-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <PostInteractions
        postId={post.id}
        initialViews={post.views}
        initialLikes={post.likes}
      />
    </article>
  );
}
