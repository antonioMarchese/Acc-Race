import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params;
  try {
    const track = await prisma.track.findFirst({
      where: {
        name,
      },
    });

    if (!track) {
      throw new Error("Track not found");
    }

    return NextResponse.json(track);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
