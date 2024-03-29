import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const tracks = await prisma.track.findMany({});

    if (!tracks) {
      throw new Error("Could not find any track.");
    }

    return NextResponse.json(tracks);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
