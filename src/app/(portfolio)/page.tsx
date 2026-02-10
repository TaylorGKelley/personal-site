"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { ReactIcon } from "@/src/components/ui/icons/react-icon";
import { NextJSIcon } from "@/src/components/ui/icons/next-js-icon";
import { NodeJSIcon } from "@/src/components/ui/icons/node-js-icon";
import { TailwindIcon } from "@/src/components/ui/icons/tailwind-icon";
import { GraphQLIcon } from "@/src/components/ui/icons/graphql-icon";
import { PostgresIcon } from "@/src/components/ui/icons/postgres-icon";
import Image from "next/image";
import Link from "next/link";

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
            <div className="min-h-dvh w-screen flex justify-center items-center flex-col gap-12">
              <h1 className="text-7xl font-mono font-extrabold text-white">
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
      <main className="flex flex-col gap-8">
        <motion.section
          id="home"
          className="flex flex-col gap-16 justify-center items-center min-h-[60dvh] max-w-5xl mx-auto"
        >
          <div className="w-fit">
            <h2 className="font-light text-3xl text-left">taylor is a</h2>
            <h1 className="font-extrabold text-5xl font-mono tracking-tighter">
              Full-Stack Software Engineer
            </h1>
            <h2 className="font-light text-4xl text-right">
              crafting experiences for the web
            </h2>
          </div>
          <div className="flex gap-8">
            <div className="w-24 aspect-square flex items-center justify-center bg-gray-100 text-gray-400 shadow-inner rounded-full">
              <ReactIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center bg-gray-100 text-gray-400 shadow-inner rounded-full">
              <NextJSIcon className="size-18 text-gray-500" />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center bg-gray-100 text-gray-400 shadow-inner rounded-full">
              <NodeJSIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center bg-gray-100 text-gray-400 shadow-inner rounded-full">
              <TailwindIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center bg-gray-100 text-gray-400 shadow-inner rounded-full">
              <GraphQLIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center bg-gray-100 text-gray-400 shadow-inner rounded-full">
              <PostgresIcon className="size-15" />
            </div>
          </div>
        </motion.section>
        <section id="projects" className="max-w-5xl w-full mx-auto">
          <h3>Showcased Projects</h3>
          <Image src="" alt="project image" />
          <div>
            {/*Container holding scrollable content */}
            <div>
              <h4>Project title</h4>
              <p>Description of this project as you scroll past them</p>
            </div>
            <div>
              <h4>Project title</h4>
              <p>Description of this project as you scroll past them</p>
            </div>
          </div>
        </section>
        <section id="contact" className="h-screen bg-gray-900 text-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-1 text-8xl font-mono font-black italic">
              <Link href="https://github.com/TaylorGKelley">GitHub</Link>
              <Link href="https://linkedin.com/in/taylor-g-kelley">
                Linked_In
              </Link>
              <Link href="https://youtube.com/@taylorkelley_dev">YouTube</Link>
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
