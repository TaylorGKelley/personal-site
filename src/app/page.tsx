"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-loader"
            initial={{ bottom: 0 }}
            animate={{ bottom: "100%" }}
            transition={{ delay: 1, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => setShowIntro(false)}
            className="bg-purple-200 flex justify-center items-center z-50 fixed inset-0 overflow-clip"
          >
            <motion.h1
              className="text-2xl text-black"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              Taylor Kelley
            </motion.h1>{" "}
          </motion.div>
        )}
      </AnimatePresence>
      <div>
        Home
        <Link href="/blog">Blog</Link>
      </div>
    </>
  );
}
