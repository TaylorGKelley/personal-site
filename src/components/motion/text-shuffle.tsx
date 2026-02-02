import { cn } from "@/src/utils/tw";
import * as motion from "motion/react-client";

export default function MotionTextShuffle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const characters = (children as string).split("");

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative block w-fit overflow-hidden whitespace-nowrap font-black font-mono tracking-tight",
        "lg:text-8xl lg:leading-24",
        "md:text-7xl md:leading-18",
        "text-4xl leading-9",
        className,
      )}
    >
      <div>
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "-5%" },
              hovered: { y: "-105%" },
            }}
            transition={{ duration: 0.1, delay: i * 0.025 }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: "105%" },
              hovered: { y: "-5%" },
            }}
            transition={{ duration: 0.1, delay: i * 0.025 }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
