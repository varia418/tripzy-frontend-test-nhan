import { useImperativeHandle, useRef, useState } from "react";
import { Input, InputProps, InputRef } from "./input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  description: string;
  value: string;
}

interface AutocompleteProps {
  options: Option[];
  inputProps: InputProps;
  isError: boolean;
  onValueChange?: (value: string) => void;
}

function Autocomplete({
  options,
  inputProps,
  isError,
  onValueChange,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<InputRef>(null);

  useImperativeHandle(inputProps.ref, () => inputRef.current!);

  return (
    <Command className="overflow-visible">
      <CommandPrimitive.Input asChild>
        <Input
          {...inputProps}
          ref={inputRef}
          aria-invalid={isError}
          onBlur={(e) => {
            setIsOpen(false);
            inputProps.onBlur?.(e);
          }}
          onFocus={(e) => {
            setIsOpen(true);
            inputProps.onFocus?.(e);
          }}
        />
      </CommandPrimitive.Input>
      <div
        className={cn("relative top-2 w-[331px]", isOpen ? "block" : "hidden")}
      >
        <CommandList
          className="bg-background absolute max-h-[350px] w-full gap-0.5 rounded-lg p-1 shadow-[0_4px_12px_0_hsla(207,57%,29%,0.12)]"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                className="flex flex-col items-start gap-2 px-4 py-2"
                onSelect={() => {
                  onValueChange?.(option.value);
                  inputRef?.current?.blur();
                }}
              >
                <p className="text-sm leading-none font-semibold tracking-normal">
                  {option.label}
                </p>
                <p className="text-muted-foreground text-xs leading-none font-semibold tracking-normal">
                  {option.description}
                </p>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </div>
    </Command>
  );
}

export default Autocomplete;

// Adapted from armandSalle’s autocomplete component:
// https://github.com/armandsalle/my-site/blob/main/src/react/autocomplete.tsx
