import { prisma } from "@/lib/prisma";
import { Car } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface CreateEventProps {
  date: Date;
  trackId: number;
  serverName: string;
}

export async function GET(request: NextRequest) {
  try {
    const cars = await prisma.car.findMany({});

    if (!cars) {
      throw new Error("Could not find any car.");
    }

    const parsedCars: Car[] = cars.map((car) => ({
      id: car.external_id,
      model: car.model,
      year: car.year,
    }));

    return NextResponse.json(parsedCars);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

export async function POST(request: NextRequest) {
  try {
    const { date, trackId, serverName } =
      (await request.json()) as CreateEventProps;

    if (!date || !trackId) throw new Error("Date or track id not present.");

    const existingEvent = await prisma.event.findUnique({
      where: {
        track_id_date: {
          track_id: trackId,
          date,
        },
      },
    });

    if (existingEvent) {
      return NextResponse.json(existingEvent);
    }

    const newEvent = await prisma.event.create({
      data: {
        date,
        track_id: trackId,
        server: serverName,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
