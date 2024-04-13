import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full h-10 text-white bg-transparent border border-zinc-50 rounded-md p-2",
        className
      )}
    />
  );
}
