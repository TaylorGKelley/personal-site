import { cn } from "@/src/utils/tw";

export default function Card({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("bg-gray-50 rounded-3xl px-16 py-20 shadow-md", className)}
    >
      {children}
    </div>
  );
}
