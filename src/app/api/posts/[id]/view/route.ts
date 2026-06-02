import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await prisma.post.update({
    where: { id },
    data: { views: { increment: 1 } },
    select: { views: true },
  });

  return NextResponse.json({ views: post.views });
}
