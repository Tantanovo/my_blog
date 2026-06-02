"use client";

import { useState, useEffect, useCallback } from "react";
import { formatRelativeTime } from "@/lib/utils";

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface PostInteractionsProps {
  postId: string;
  initialViews: number;
  initialLikes: number;
}

function getVisitorId(): string {
  const key = "blog_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function PostInteractions({
  postId,
  initialViews,
  initialLikes,
}: PostInteractionsProps) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${postId}/view`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.views) setViews(data.views);
      })
      .catch(() => {});
  }, [postId]);

  useEffect(() => {
    const visitorId = getVisitorId();
    fetch(`/api/posts/${postId}/like?visitorId=${visitorId}`)
      .then((res) => res.json())
      .then((data) => setLiked(data.liked))
      .catch(() => {});
  }, [postId]);

  const loadComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch {
      /* ignore */
    } finally {
      setLoadingComments(false);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  async function handleLike() {
    const visitorId = getVisitorId();
    const res = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
    });
    const data = await res.json();
    setLikes(data.likes);
    setLiked(data.liked);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: author.trim(), content: content.trim() }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [newComment, ...prev]);
        setContent("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-6 py-4 border-y border-slate-200">
        <span className="flex items-center gap-2 text-slate-600">
          <span className="text-lg">👁</span>
          <span className="font-medium">{views}</span>
          <span className="text-sm text-slate-400">浏览</span>
        </span>
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            liked ? "text-red-500" : "text-slate-600 hover:text-red-500"
          }`}
        >
          <span className="text-lg">{liked ? "❤️" : "🤍"}</span>
          <span className="font-medium">{likes}</span>
          <span className="text-sm text-slate-400">点赞</span>
        </button>
      </div>

      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          评论 ({comments.length})
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="你的昵称"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              maxLength={50}
              required
            />
          </div>
          <textarea
            placeholder="写下你的评论..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            maxLength={1000}
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary text-sm"
          >
            {submitting ? "提交中..." : "发表评论"}
          </button>
        </form>

        {loadingComments ? (
          <p className="text-sm text-slate-400">加载评论中...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-slate-400">暂无评论，来抢沙发吧！</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-slate-50 rounded-xl p-4 border border-slate-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-800">
                    {comment.author}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
