import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const visitorId = request.nextUrl.searchParams.get("visitorId");

  if (!visitorId) {
    return NextResponse.json({ liked: false });
  }

  const record = await prisma.likeRecord.findUnique({
    where: { postId_visitorId: { postId: id, visitorId } },
  });

  return NextResponse.json({ liked: !!record });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { visitorId } = await request.json();

  if (!visitorId) {
    return NextResponse.json({ error: "缺少 visitorId" }, { status: 400 });
  }

  const existing = await prisma.likeRecord.findUnique({
    where: { postId_visitorId: { postId: id, visitorId } },
  });

  if (existing) {
    await prisma.likeRecord.delete({ where: { id: existing.id } });
    const post = await prisma.post.update({
      where: { id },
      data: { likes: { decrement: 1 } },
      select: { likes: true },
    });
    return NextResponse.json({ liked: false, likes: Math.max(0, post.likes) });
  }

  await prisma.likeRecord.create({ data: { postId: id, visitorId } });
  const post = await prisma.post.update({
    where: { id },
    data: { likes: { increment: 1 } },
    select: { likes: true },
  });

  return NextResponse.json({ liked: true, likes: post.likes });
}
