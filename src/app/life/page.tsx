import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "生活分享 | 杨子业的博客",
};

export default async function LifePage() {
  const posts = await prisma.post.findMany({
    where: { category: "LIFE", published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🌿</span>
          <h1 className="text-3xl font-bold text-slate-900">生活分享</h1>
        </div>
        <p className="text-slate-500">
          学习记录、读书笔记与大学日常
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="panel-card text-center py-12">
          <p className="text-slate-400">暂无文章</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} category="LIFE" />
          ))}
        </div>
      )}
    </div>
  );
}
