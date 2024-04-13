"use client";

import { RaceTypes, eventStyle } from "@/utils/choices";
import { columns } from "@/components/cars/columns";
import { DataTable } from "@/components/cars/data_table";
import EventsForm, { CreateEventFormData } from "@/components/events/form";
import { Button } from "@/components/ui/button";
import { Car } from "@/types";
import { EventStyle, EventType } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import getEventName from "@/utils/parseFile/extractEventName";

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState<EventType>();
  const [style, setStyle] = useState<EventStyle>();
  const [files, setFiles] = useState<FileList | null>(null);

  const fetchCars = useCallback(async () => {
    const response = await fetch("/api/cars", {
      method: "GET",
    });
    if (response.status === 200) {
      const parsedResponse = await response.json();
      setCars(parsedResponse);
    }
  }, [setCars]);

  function readFile(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        const parsed = JSON.parse(content);
        // Extract file name
        const fileName = file.name;
        const [eventDate, sessionType] = getEventName({ fileName });
        
        // Extract trackname
        const trackName = parsed.trackName;

        console.info({ parsed, eventDate, sessionType, trackName });
      } catch (error) {
        alert("Erro ao fazer o parse do arquivo JSON.");
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(file, "UTF-8");
  }

  async function handleSubmit(data: CreateEventFormData) {
    console.info({ data });
    data.files.forEach((file) => readFile(file));
  }

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <main className="flex min-h-screen items-center justify-center gap-5 p-24 bg-zinc-950">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="w-full text-left font-bold text-xl text-white">
          Carros
        </h1>
        <DataTable columns={columns} data={cars} />
      </div>
      <EventsForm handleSubmit={handleSubmit} />
    </main>
  );
}
