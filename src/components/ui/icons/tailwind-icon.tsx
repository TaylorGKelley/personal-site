import { cn } from "@/src/utils/tw";
import { forwardRef } from "react";

export const TailwindIcon = forwardRef(function TailwindIcon(
  {
    color = "currentColor",
    className,
    ...props
  }: React.SVGProps<SVGSVGElement>,
  ref: React.Ref<SVGSVGElement>,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-16", className)}
      {...props}
    >
      <path
        d="M18 27.4C19.8667 19.9333 24.5333 16.2 32 16.2C43.2 16.2 44.6 24.6 50.2 26C53.9333 26.9333 57.2 25.5333 60 21.8C58.1333 29.2667 53.4667 33 46 33C34.8 33 33.4 24.6 27.8 23.2C24.0667 22.2667 20.8 23.6667 18 27.4ZM4 44.2C5.86667 36.7333 10.5333 33 18 33C29.2 33 30.6 41.4 36.2 42.8C39.9333 43.7333 43.2 42.3333 46 38.6C44.1333 46.0667 39.4667 49.8 32 49.8C20.8 49.8 19.4 41.4 13.8 40C10.0667 39.0667 6.8 40.4667 4 44.2Z"
        fill={color}
      />
    </svg>
  );
});
