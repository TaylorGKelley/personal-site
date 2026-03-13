"use client";

import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import { useActionState, useState } from "react";
import { ReactIcon } from "@/src/components/ui/icons/react-icon";
import { NextJSIcon } from "@/src/components/ui/icons/next-js-icon";
import { NodeJSIcon } from "@/src/components/ui/icons/node-js-icon";
import { TailwindIcon } from "@/src/components/ui/icons/tailwind-icon";
import { GraphQLIcon } from "@/src/components/ui/icons/graphql-icon";
import { PostgresIcon } from "@/src/components/ui/icons/postgres-icon";
import Link from "next/link";
import Card from "../components/ui/card";
import infoConfig from "../data/info.config";
import { sendContactEmail } from "../actions/mail";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [highlightedProject, ...projects] = infoConfig.projects;

  const [state, action, isPending] = useActionState(sendContactEmail, {
    values: {
      email: "",
      name: "",
      description: "",
    },
  });

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
          className="flex flex-col gap-16 justify-center items-center min-h-[60dvh] max-w-7xl container mx-auto"
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
            <div className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full">
              <ReactIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full">
              <NextJSIcon className="size-18 text-gray-500" />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full">
              <NodeJSIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full">
              <TailwindIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full">
              <GraphQLIcon />
            </div>
            <div className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full">
              <PostgresIcon className="size-15" />
            </div>
          </div>
        </motion.section>
        <section
          id="projects"
          className="max-w-7xl container w-full mx-auto py-8 grid grid-cols-2 gap-16"
        >
          <Card className="col-span-2">
            <h2 className="text-5xl font-mono font-black italic mb-6">
              {highlightedProject.title}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-6">
                <p className="text-xl text-gray-600">
                  {highlightedProject.description}
                </p>
                <div className="flex gap-4">
                  <Link
                    href={highlightedProject.url}
                    className="cursor-pointer px-4 py-3 bg-gray-800 border border-gray-800 hover:bg-gray-700 hover:border-gray-700 transition-colors text-gray-50 rounded-lg"
                  >
                    Preview
                  </Link>
                  <Link
                    href={"/" + highlightedProject.slug}
                    className="cursor-pointer px-4 py-3 border bg-gray-200/0 transition-colors hover:bg-gray-200/30 border-gray-600 text-gray-600 rounded-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="z-30 aspect-video w-96 bg-gray-500 mx-auto rounded-2xl shadow-md">
                  {/*img with {highlightedProject.coverImageSrc}*/}
                </div>
                <div className="z-20 -ml-36 aspect-video w-72 bg-gray-400 mx-auto rounded-2xl shadow-md"></div>
                <div className="z-10 -ml-30 aspect-video w-56 bg-gray-300 mx-auto rounded-2xl shadow-md"></div>
              </div>
            </div>
          </Card>
          {projects.map((project) => (
            <Card key={project.slug} className="grid gap-10">
              <h3 className="text-4xl font-mono font-black italic">
                {project.title}
              </h3>
              <div className="flex gap-4 mx-auto">
                <Link
                  href={project.url}
                  className="cursor-pointer px-4 py-3 bg-gray-800 border border-gray-800 hover:bg-gray-700 hover:border-gray-700 transition-colors text-gray-50 rounded-lg"
                >
                  Preview
                </Link>
                <Link
                  href={"/" + project.slug}
                  className="cursor-pointer px-4 py-3 border bg-gray-200/0 transition-colors hover:bg-gray-200/30 border-gray-600 text-gray-600 rounded-lg"
                >
                  Learn More
                </Link>
              </div>
              <div className="aspect-video w-96 bg-gray-500 mx-auto rounded-2xl shadow-md">
                {/*img with {project.coverImageSrc}*/}
              </div>
            </Card>
          ))}
        </section>
        <section
          id="contact"
          className="py-24 bg-gray-900 text-gray-50 grid grid-cols-2 justify-center items-center"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid *:py-2 text-8xl font-mono font-black italic">
              <Link
                href={infoConfig.contact.github}
                className="hover:translate-x-2 hover:rotate-2 transition-transform"
              >
                GitHub
              </Link>
              <Link
                href={infoConfig.contact.linkedin}
                className="hover:translate-x-2 hover:-rotate-2 transition-transform"
              >
                Linked_In
              </Link>
              <Link
                href={infoConfig.contact.youtube}
                className="hover:translate-x-2 hover:rotate-1 transition-transform"
              >
                YouTube
              </Link>
              <Link
                href={infoConfig.contact.blog}
                className="hover:translate-x-2 hover:-rotate-3 transition-transform"
              >
                Blog
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-6xl font-mono font-semibold italic mb-8">
              Contact Me
            </h4>
            <form action={action} className="flex flex-col gap-6 max-w-md">
              <input
                type="name"
                id="name"
                name="name"
                placeholder="Name"
                defaultValue={state.values?.name}
                className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 text-gray-50 placeholder:text-gray-300"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                defaultValue={state.values?.email}
                className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 text-gray-50 placeholder:text-gray-300"
              />
              <textarea
                id="description"
                name="description"
                placeholder="What's up?"
                defaultValue={state.values?.description}
                className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 min-h-64 resize-none text-gray-50 placeholder:text-gray-300"
              />
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 text-gray-50 transition-colors hover:bg-gray-100 hover:text-gray-900 hover:border-gray-200 cursor-pointer"
              >
                Get in touch!
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
