import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition border";
  const styles =
    variant === "primary"
      ? "bg-primary text-[hsl(var(--primary-foreground))] border-transparent hover:opacity-90"
      : "bg-transparent text-foreground border-border hover:bg-muted";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
