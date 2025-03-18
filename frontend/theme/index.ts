import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export let colors = {
  bg: "#10302A",
  primary: "#DBE49A",
  secondary: "#FC4C40",
};

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
