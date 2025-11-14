/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isObject(o: any) {
  return o === Object(o) && !Array.isArray(o) && typeof o !== "function";
}

function toCamel(s: string) {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

export function keysToCamel(o: any) {
  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (Array.isArray(o)) {
    return o.map((i): any => {
      return keysToCamel(i);
    });
  }

  return o;
}
