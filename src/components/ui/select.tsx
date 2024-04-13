import * as React from "react";

import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.InputHTMLAttributes<HTMLSelectElement> {
  hasIcon?: boolean;
  hideErrorIcon?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, hasIcon, hideErrorIcon = false, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            `w-full h-12 bg-transparent disabled:bg-neutral-300 disabled:border-none disabled:text-neutral-400 py-3 pl-4 flex items-center justify-between rounded-md border-2 placeholder:text-neutral-400 text-white border-neutral-400 focus:border-primary outline-none text-base font-medium ${
              hasIcon && "pr-10"
            }`,
            className
          )}
          {...props}
        >
          {children}
        </select>
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
