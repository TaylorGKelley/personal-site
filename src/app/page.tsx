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
              delay: 2,
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
                  className="text-center"
                >
                  Web
                </motion.li>
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
                  Security
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    delay: 0.25,
                    duration: 0.25,
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
        <section className="flex justify-center items-center sm:py-32 py-20 px-4">
          <h1 className="text-6xl max-lg:sm:text-[calc(3*1.4vw+1rem)] max-sm:text-4xl">
            Taylor Kelley is a Full Stack Software Developer working at{" "}
            <span className="text-gray-400">
              Alabama&apos;s Law Enforcement Agency
            </span>
          </h1>
        </section>
        <section className="grid gap-36 py-20 px-4">
          {infoConfig.projects.map((project, i) => (
            <div
              key={i}
              className="grid md:grid-cols-2 items-center md:gap-24 gap-8 "
            >
              <Image
                src={project.coverImageSrc}
                className={cn(
                  "object-cover max-w-md w-full aspect-video h-full max-md:mx-auto",
                  {
                    "md:order-2": i % 2 != 0,
                  },
                )}
                width={6400}
                height={4800}
                alt={`Project image for ${project.title}`}
              />
              <div
                className={cn(
                  "grid gap-4 max-md:mx-auto max-w-md max-md:text-center",
                  {
                    "md:order-1": i % 2 != 0,
                  },
                )}
              >
                <h3 className="text-4xl ">{project.title}</h3>
                <p className="text-xl ">{project.description}</p>
                <Link
                  href={`projects/${project.slug}`}
                  className="flex gap-2 hover:gap-3 transition-all ease-in-out items-center hover:underline underline-offset-4 max-md:mx-auto"
                >
                  <span>Learn More</span>
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </section>
        <section>
          <h3 className="font-bold text-5xl px-2 md:text-6xl text-gray-600">
            Where I Worked
          </h3>
          <div className="grid gap-36 py-24 px-4">
            {infoConfig.workPlaces.map((workPlace, i) => (
              <div key={i} className="grid md:grid-cols-2 md:gap-16 gap-4">
                <h4 className="md:text-4xl text-3xl italic">
                  {workPlace.jobTitle}
                </h4>
                <div className="grid gap-4">
                  <h5 className="text-2xl max-md:text-gray-500 max-md:text-xl">
                    {workPlace.company}
                  </h5>
                  <p className="text-gray-500">{workPlace.description}</p>
                  <p className="text-gray-500 italic">{`${
                    workPlace.location
                  } - ${formatDate(workPlace.startDate)} - ${
                    workPlace.endDate
                      ? formatDate(workPlace.endDate)
                      : "Present"
                  }`}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
