import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ButtonGroup } from "./button-group";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleStep = (direction: "up" | "down") => {
      if (inputRef.current) {
        direction === "up"
          ? inputRef.current.stepUp()
          : inputRef.current.stepDown();

        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    };

    return (
      <div className="relative">
        {icon && (
          <span className="absolute top-1/2 left-3 flex size-5 -translate-y-1/2 items-center justify-center">
            {icon}
          </span>
        )}
        <input
          ref={inputRef}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            icon && "pl-9",
            type === "number" && "pr-9",
            className
          )}
          {...props}
        />
        {type === "number" && (
          <ButtonGroup
            orientation="vertical"
            className="absolute top-1/2 right-0 h-full -translate-y-1/2"
          >
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              className="shrink-1 rounded-l-none"
              onClick={() => handleStep("up")}
            >
              <ChevronUp />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              type="button"
              className="shrink-1 rounded-l-none"
              onClick={() => handleStep("down")}
            >
              <ChevronDown />
            </Button>
          </ButtonGroup>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
