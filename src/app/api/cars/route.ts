import { prisma } from "@/lib/prisma";
import { Car } from "@/types";
import { NextRequest, NextResponse } from "next/server";

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
