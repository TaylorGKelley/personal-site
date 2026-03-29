import { cn } from "@/src/utils/tw";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Responsive Card wrapper
 *
 * - Reduces horizontal/vertical padding on small screens
 * - Ensures the card takes full available width (so it doesn't overflow on mobile)
 * - Keeps the rounded corners and shadow
 *
 * Usage: <Card className="...">...</Card>
 */
export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        // Full width, limited padding on small screens, larger padding on md+ and increased padding on lg+
        "w-full max-w-full bg-gray-50 rounded-3xl shadow-md overflow-hidden",
        "px-6 py-8 lg:px-16 lg:py-20",
        // Allow consumers to override/add classes
        className,
      )}
    >
      {children}
    </div>
  );
}
