export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} 杨子业的博客 · C++ / iOS 开发</p>
      </div>
    </footer>
  );
}
