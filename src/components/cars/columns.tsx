"use client";

import { Car } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "year",
    header: "Ano",
  },
];
