import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/input";
import { EventStyle, EventType } from "@prisma/client";
import { RaceTypes, eventStyle } from "@/utils/choices";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { useState } from "react";
import range from "@/utils/range";

const createEventFormSchema = z.object({
  files: z.array(z.instanceof(File)),
});

export type CreateEventFormData = z.infer<typeof createEventFormSchema>;

interface EventsFormProps {
  handleSubmit: (data: CreateEventFormData) => void;
}

export default function EventsForm({ handleSubmit }: EventsFormProps) {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventFormSchema),
  });

  function handleChangeFilesInput(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(
        range(fileList.length).map((fileIndex) => fileList.item(fileIndex)!)
      );
      form.setValue(
        "files",
        range(fileList.length).map((fileIndex) => fileList.item(fileIndex)!)
      );
      return;
    }
    form.setValue("files", []);
    setFiles([]);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col items-start justify-start gap-2"
      >
        <FormItem className="flex items-end flex-grow">
          <div className="flex justify-center w-full gap-2 flex-col">
            <FormLabel className="text-success text-sm hover:cursor-pointer">
              + Adicionar arquivos
            </FormLabel>
            {files &&
              files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <div className="flex items-center justify-start gap-2 border border-neutral-400 rounded-lg px-4 py-2 w-full max-w-xs text-clip">
                    {/* <PaperClipIcon className="w-5 h-5 text-success" /> */}
                    <small className="text-neutral-600 font-light">
                      {file.name}
                    </small>
                  </div>
                  {/* <button onClick={() => handleRemoveFile(index)} type="button">
                    <TrashIcon className="w-5 h-5 text-error" />
                  </button> */}
                </div>
              ))}
            <FormControl>
              <Input
                onChange={handleChangeFilesInput}
                type="file"
                multiple
                className="hidden"
                accept="application/json"
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
        <Button className="bg-slate-300 text-zinc-950">Confirmar</Button>
      </form>
    </Form>
  );
}
