"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import MotionTextShuffle from "./motion/text-shuffle";
import React from "react";

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex justify-between items-center p-4 md:p-12 max-w-360 mx-auto bg-gray-100">
      <Link href="/">
        <h3 className="text-lg font-mono font-semibold">taylor_kelley</h3>
      </Link>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        menu
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {
                opacity: 0,
                scaleY: 0,
              },
              visible: {
                opacity: 1,
                scaleY: 1,
                transition: {
                  duration: 0.2,
                },
              },
              exit: {
                opacity: 0,
                scaleY: 0,
                transition: {
                  duration: 0.15,
                  delay: 0.2,
                },
              },
            }}
            className="fixed inset-0 bg-gray-700 text-gray-50 grid grid-rows-[auto_1fr] origin-top z-50 p-4"
          >
            <div className="flex justify-end pt-4 pr-4 md:pt-12 md:pr-12 w-full max-w-360 mx-auto">
              <button onClick={() => setOpen(false)} className="cursor-pointer">
                close
              </button>
            </div>
            <ul className="container mx-auto flex flex-col justify-center items-center md:items-start h-full gap-4 max-w-5xl">
              <li>
                <Link onClick={() => setOpen(false)} href="/">
                  <MotionTextShuffle>Home</MotionTextShuffle>
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpen(false)} href="/about">
                  <MotionTextShuffle>About</MotionTextShuffle>
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpen(false)} href="/blog">
                  <MotionTextShuffle>Blog</MotionTextShuffle>
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
