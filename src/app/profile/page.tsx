import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  if (!profile) notFound();

  const skills: string[] = JSON.parse(profile.skills || "[]");
  const highlights: string[] = JSON.parse(profile.highlights || "[]");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="panel-card text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 text-6xl bg-brand-50 rounded-full mb-6">
          {profile.avatar}
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {profile.name}
        </h1>
        <p className="text-lg text-brand-600 font-medium mb-4">
          {profile.title}
        </p>
        <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">
          {profile.bio}
        </p>
      </div>

      {profile.education && (
        <div className="panel-card mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">教育背景</h2>
          <p className="text-slate-600">{profile.education}</p>
        </div>
      )}

      {highlights.length > 0 && (
        <div className="panel-card mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">荣誉与经历</h2>
          <ul className="space-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed"
              >
                <span className="text-brand-500 mt-1 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="panel-card mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">技能栈</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="panel-card">
        <h2 className="text-xl font-bold text-slate-900 mb-4">联系方式</h2>
        <div className="space-y-3">
          {profile.phone && (
            <div className="flex items-center gap-3 text-slate-600">
              <span>📱</span>
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.email && (
            <div className="flex items-center gap-3 text-slate-600">
              <span>📧</span>
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-brand-600 transition-colors"
              >
                {profile.email}
              </a>
            </div>
          )}
          {profile.github && (
            <div className="flex items-center gap-3 text-slate-600">
              <span>🐙</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 transition-colors"
              >
                GitHub · Tantanovo
              </a>
            </div>
          )}
          {profile.csBlog && (
            <div className="flex items-center gap-3 text-slate-600">
              <span>📝</span>
              <a
                href={profile.csBlog}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-600 transition-colors"
              >
                CSDN 博客（200+ 原创，25W+ 浏览）
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
