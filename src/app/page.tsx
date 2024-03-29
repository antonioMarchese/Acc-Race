"use client";

import { RaceTypes, eventStyle } from "@/choices";
import { columns } from "@/components/cars/columns";
import { DataTable } from "@/components/cars/data_table";
import { Button } from "@/components/ui/button";
import { Car } from "@/types";
import { EventStyle, EventType } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.info({
      name,
      style,
      type,
      files,
    });
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-center gap-2 text-white"
      >
        <div className="flex flex-col items-start gap-1">
          <label>Nome</label>
          <input
            className="text-zinc-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <label>Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as EventType)}
            className="text-zinc-700"
          >
            <option defaultChecked hidden>
              Selecione o tipo
            </option>
            {RaceTypes.map((type) => (
              <option value={type.value} key={type.value}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <label>Estilo</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as EventStyle)}
            className="text-zinc-700"
          >
            <option defaultChecked hidden>
              Selecione o estilo
            </option>
            {eventStyle.map((style) => (
              <option value={style.value} key={style.value}>
                {style.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <label>Arquivos</label>
          <input
            onChange={(e) => setFiles(e.target.files)}
            type="file"
            multiple
            accept=".json"
          />
        </div>
        <Button className="bg-slate-300 text-zinc-950">Confirmar</Button>
      </form>
    </main>
  );
}
