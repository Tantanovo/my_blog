import Link from "next/link";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/profile", label: "个人简介" },
  { href: "/tech", label: "技术博客" },
  { href: "/life", label: "生活分享" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">✍️</span>
          <span className="font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
            杨子业的博客
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:text-brand-600 hover:bg-brand-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
