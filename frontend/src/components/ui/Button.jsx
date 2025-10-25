import React from "react";
import { cn } from "../../lib/utils";

export const buttonVariants = ({ variant, className }) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none";
  const variants = {
    default: "bg-white text-black hover:bg-gray-200",
    outline: "border border-gray-500 text-white hover:bg-gray-800",
    ghost: "text-gray-300 hover:bg-gray-800",
  };
  return cn(base, variants[variant] || variants.default, className);
};

export function Button({ variant = "default", size, className, ...props }) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  );
}
