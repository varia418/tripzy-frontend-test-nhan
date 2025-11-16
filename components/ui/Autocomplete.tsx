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

interface AutocompleteProps {
  options: string[];
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
  const [inputValue, setInputValue] = useState(inputProps.value || "");
  const inputRef = useRef<InputRef>(null);

  useImperativeHandle(inputProps.ref, () => inputRef.current!);

  return (
    <Command className="overflow-visible">
      <CommandPrimitive.Input asChild>
        <Input
          {...inputProps}
          ref={inputRef}
          value={inputValue}
          aria-invalid={isError}
          onBlur={(e) => {
            setIsOpen(false);
            inputProps.onBlur?.(e);
          }}
          onFocus={(e) => {
            setIsOpen(true);
            inputProps.onFocus?.(e);
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
            inputProps.onChange?.(e);
          }}
        />
      </CommandPrimitive.Input>
      <div className={cn("relative top-1", isOpen ? "block" : "hidden")}>
        <CommandList className="bg-background absolute w-full rounded-lg p-1 shadow-[0_4px_12px_0_hsla(207,57%,29%,0.12)]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onSelect={() => {
                  setInputValue(option);
                  onValueChange?.(option);
                  inputRef?.current?.blur();
                }}
              >
                {option}
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
