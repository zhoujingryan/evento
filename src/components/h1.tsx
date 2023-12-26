import { cn } from "@/lib/utilis";
import React from "react";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function H1({ className, children }: H1Props) {
  return (
    <h1
      className={cn(
        "text-3xl lg:text-6xl font-bold tracking-tighter",
        className
      )}
    >
      {children}
    </h1>
  );
}
