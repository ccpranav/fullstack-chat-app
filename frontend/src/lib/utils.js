import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "numeric", // "numeric" removes leading zero
    minute: "2-digit",
    hour12: true, // enables AM/PM
  });
}
