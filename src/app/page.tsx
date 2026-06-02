import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

async function getData() {
  const [profile, techPosts, lifePosts] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.post.findMany({
      where: { category: "TECH", published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.post.findMany({
      where: { category: "LIFE", published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);
  return { profile, techPosts, lifePosts };
}

export default async function HomePage() {
  const { profile, techPosts, lifePosts } = await getData();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 text-5xl bg-brand-50 rounded-2xl mb-6">
          {profile?.avatar ?? "✍️"}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          {profile?.name ? `${profile.name} 的博客` : "我的博客"}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {profile?.bio ?? "记录技术探索与日常生活"}
        </p>
      </section>

      {/* Three Panels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Link href="/profile" className="panel-card group text-center">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
            👤
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
            个人简介
          </h2>
          <p className="text-sm text-slate-500">
            教育背景、实习经历与技能栈
          </p>
        </Link>

        <Link href="/tech" className="panel-card group text-center">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
            💻
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
            技术博客
          </h2>
          <p className="text-sm text-slate-500">
            C++、iOS、Linux 与工程实践
          </p>
        </Link>

        <Link href="/life" className="panel-card group text-center">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
            🌿
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">
            生活分享
          </h2>
          <p className="text-sm text-slate-500">
            学习记录、读书笔记与大学日常
          </p>
        </Link>
      </section>

      {/* Recent Tech Posts */}
      {techPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">最新技术文章</h2>
            <Link
              href="/tech"
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-4">
            {techPosts.map((post) => (
              <PostCard key={post.id} {...post} category="TECH" />
            ))}
          </div>
        </section>
      )}

      {/* Recent Life Posts */}
      {lifePosts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">最新生活分享</h2>
            <Link
              href="/life"
              className="text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-4">
            {lifePosts.map((post) => (
              <PostCard key={post.id} {...post} category="LIFE" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
