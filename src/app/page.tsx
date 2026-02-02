"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import infoConfig from "../data/info.config";
import formatDate from "../utils/formatDate";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "../utils/tw";
import Image from "next/image";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-loader"
            initial={{ height: "100dvh" }}
            animate={{ height: 0 }}
            transition={{
              delay: 1.75,
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={() => setShowIntro(false)}
            className="bg-gray-700 z-50 fixed inset-0 overflow-clip h-dvh"
          >
            <div className="min-h-dvh w-screen flex justify-center items-center flex-col gap-8">
              <h1 className="text-7xl font-mono font-bold text-white">
                taylor_kelley
              </h1>
              <ul className="grid grid-cols-3 gap-6 text-white text-xl">
                <motion.li
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.25,
                    type: "keyframes",
                  }}
                  className="text-right"
                >
                  Web
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    delay: 0.275,
                    duration: 0.25,
                    type: "keyframes",
                  }}
                  className="text-center"
                >
                  Security
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.5,
                    type: "keyframes",
                  }}
                  className="text-left"
                >
                  Design
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex flex-col gap-8 max-w-5xl mx-auto">
        <section></section>
      </main>
    </>
  );
}
