import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Post dates and contribution days are bare YYYY-MM-DD. Parsing them without an
// explicit zone makes them local, which shifts the day west of UTC.
export function utcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}
