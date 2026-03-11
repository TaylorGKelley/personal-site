import { cn } from "@/src/utils/tw";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useEffect } from "react";

// --- Configuration ---
const MAX_OFFSET = 20; // The absolute maximum pixels the image will move.
const STRENGTH = 0.01; // Exponential constant. Lower (e.g., 0.002) = smoother curve.
const SPRING_CONFIG = { stiffness: 150, damping: 20 }; // Controls smoothness/snappiness

export const ParallaxImage = ({
  src,
  alt = "Parallax effect",
  style,
  className,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1. Motion Values (efficient state that avoids React re-renders)
  const distanceX = useMotionValue(0);
  const distanceY = useMotionValue(0);

  // 2. The Exponential Formula
  // distance (d) => P(d) = MAX_OFFSET * (1 - e^(-STRENGTH * d))
  // We use `Math.sign` to handle positive/negative distance correctly.
  const calculateParallax = (d: number) => {
    const absD = Math.abs(d);
    const multiplier = 1 - Math.exp(-STRENGTH * absD);
    return -Math.sign(d) * (MAX_OFFSET * multiplier);
  };

  // 3. Map Distance => Target Translation
  const targetX = useTransform(distanceX, calculateParallax);
  const targetY = useTransform(distanceY, calculateParallax);

  // 4. Smooth the result with a Spring
  const smoothX = useSpring(targetX, SPRING_CONFIG);
  const smoothY = useSpring(targetY, SPRING_CONFIG);

  // 5. Native Mouse Event Tracking
  useEffect(() => {
    const element = containerRef.current;

    const handleMouseMove = (event: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();

      // Calculate Center of the Image
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate the Distance Vector from mouse to center
      const dX = event.clientX - centerX;
      const dY = event.clientY - centerY;

      // Update the motion values (triggers the animation stream)
      distanceX.set(dX);
      distanceY.set(dY);
    };

    const handleMouseLeave = () => {
      // Optional: Reset parallax on mouse out
      distanceX.set(0);
      distanceY.set(0);
    };

    // Attach listener to the whole window for better tracking when close to edges
    window.addEventListener("mousemove", handleMouseMove);
    if (element) element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (element) element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [distanceX, distanceY]);

  return (
    <div
      ref={containerRef}
      className={cn("rounded-3xl shadow overflow-clip", className)}
      style={{
        overflow: "hidden", // Crucial: Hide the image "leakage"
        // Ensure container has dimensions, or pass them in props
        display: "inline-block",
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{
          // Apply the smoothed parallax values
          x: smoothX,
          y: smoothY,
          // Optimization: Forces GPU rendering
          willChange: "transform",
          // Scale slightly so the edges are never visible when off-center
          scale: 1.125,
          // Allow custom styles/dimensions passed via props
          ...style,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Ensures image aspect ratio is respected
        }}
        {...(rest as any)}
      />
    </div>
  );
};
