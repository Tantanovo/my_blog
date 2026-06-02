import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const comments = await prisma.comment.findMany({
    where: { postId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { author, content } = await request.json();

  if (!author?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "昵称和评论内容不能为空" }, { status: 400 });
  }

  if (author.length > 50 || content.length > 1000) {
    return NextResponse.json({ error: "内容过长" }, { status: 400 });
  }

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ error: "文章不存在" }, { status: 404 });
  }

  const comment = await prisma.comment.create({
    data: {
      postId: id,
      author: author.trim(),
      content: content.trim(),
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
