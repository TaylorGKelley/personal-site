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
    success: false,
    values: {
      email: "",
      name: "",
      description: "",
    },
    error: "",
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
              <h1 className="text-5xl md:text-7xl font-mono font-extrabold text-white">
                taylor_kelley
              </h1>
              <ul className="grid grid-cols-3 gap-6 text-white text-lg md:text-xl">
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
        <section
          id="home"
          className="px-4 flex flex-col gap-8 justify-center items-center min-h-[60dvh] max-w-7xl mx-auto w-full"
        >
          <div className="w-max max-w-4xl">
            <h2 className="font-light md:text-3xl text-2xl text-left">
              taylor is a
            </h2>
            <h1 className="font-extrabold md:text-5xl text-3xl font-mono tracking-tighter">
              Full-Stack Software Engineer
            </h1>
            <h2 className="font-light md:text-4xl text-xl text-right">
              crafting experiences for the web
            </h2>
          </div>

          {/* icon grid: hide on small screens to avoid overflow */}
          <div className="hidden md:grid grid-cols-6 gap-8 w-full max-w-4xl">
            <div
              title="React"
              className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full"
            >
              <ReactIcon />
            </div>
            <div
              title="Next JS"
              className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full"
            >
              <NextJSIcon className="size-18 text-gray-500" />
            </div>
            <div
              title="Node JS"
              className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full"
            >
              <NodeJSIcon />
            </div>
            <div
              title="Tailwind CSS"
              className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full"
            >
              <TailwindIcon />
            </div>
            <div
              title="GraphQL"
              className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full"
            >
              <GraphQLIcon />
            </div>
            <div
              title="PostgreSQL"
              className="w-24 aspect-square flex items-center justify-center shadow-md bg-gray-50 text-gray-400 rounded-full"
            >
              <PostgresIcon className="size-15" />
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="px-4 max-w-7xl mx-auto w-full py-8 grid md:grid-cols-2 gap-8"
        >
          <Card className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-mono font-black italic mb-4 md:mb-6">
              {highlightedProject.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4 px-4 ">
                <p className="hidden md:block text-lg md:text-xl text-gray-600">
                  {highlightedProject.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={highlightedProject.url}
                    className="inline-block px-4 py-2 bg-gray-800 border border-gray-800 hover:bg-gray-700 hover:border-gray-700 transition-colors text-gray-50 rounded-lg text-sm"
                  >
                    Preview
                  </Link>
                  <Link
                    href={"/projects/" + highlightedProject.slug}
                    className="inline-block px-4 py-2 border bg-gray-200/0 transition-colors hover:bg-gray-200/30 border-gray-600 text-gray-600 rounded-lg text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* image column: show single responsive thumbnail on mobile and stacked covers on md+ */}
              <div className="flex items-center justify-center">
                {/* mobile single thumbnail */}
                <div className="block md:hidden aspect-video w-full bg-gray-500 rounded-2xl shadow-md overflow-hidden"></div>

                {/* stacked covers for md+ */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="z-30 aspect-video w-96 bg-gray-500 rounded-2xl shadow-md overflow-hidden"></div>
                  <div className="z-20 -ml-36 aspect-video w-72 bg-gray-400 rounded-2xl shadow-md overflow-hidden"></div>
                  <div className="z-10 -ml-30 aspect-video w-56 bg-gray-300 rounded-2xl shadow-md overflow-hidden"></div>
                </div>
              </div>
            </div>
          </Card>

          {projects.map((project) => (
            <Card key={project.slug} className="grid gap-6">
              <h3 className="text-2xl md:text-4xl font-mono font-black italic">
                {project.title}
              </h3>

              <div className="flex gap-3 flex-wrap">
                <Link
                  href={project.url}
                  className="inline-block px-4 py-2 bg-gray-800 border border-gray-800 hover:bg-gray-700 hover:border-gray-700 transition-colors text-gray-50 rounded-lg text-sm"
                >
                  Preview
                </Link>
                <Link
                  href={"/projects/" + project.slug}
                  className="inline-block px-4 py-2 border bg-gray-200/0 transition-colors hover:bg-gray-200/30 border-gray-600 text-gray-600 rounded-lg text-sm"
                >
                  Learn More
                </Link>
              </div>

              {/* responsive thumbnail: full width on small, fixed on md+ */}
              <div className="aspect-video w-full md:w-96 bg-gray-500 rounded-2xl shadow-md overflow-hidden">
                {/* project image placeholder */}
              </div>
            </Card>
          ))}
        </section>

        <section
          id="contact"
          className="px-4 py-12 md:py-24 bg-gray-900 text-gray-50 w-full"
        >
          <div className="max-w-7xl mx-auto w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:items-start justify-items-center md:justify-items-stretch">
            <div className="w-full">
              <div className="grid auto-rows-min gap-3 md:gap-4 text-center md:text-left">
                <Link
                  href={infoConfig.contact.github}
                  className="text-3xl md:text-7xl xl:text-8xl font-mono font-black italic hover:translate-x-2 xl:hover:rotate-2 transition-transform"
                >
                  GitHub
                </Link>
                <Link
                  href={infoConfig.contact.linkedin}
                  className="text-3xl md:text-7xl xl:text-8xl font-mono font-black italic hover:translate-x-2 xl:hover:-rotate-2 transition-transform"
                >
                  Linked_In
                </Link>
                <Link
                  href={infoConfig.contact.youtube}
                  className="text-3xl md:text-7xl xl:text-8xl font-mono font-black italic hover:translate-x-2 xl:hover:rotate-1 transition-transform"
                >
                  YouTube
                </Link>
                <Link
                  href={infoConfig.contact.blog}
                  className="text-3xl md:text-7xl xl:text-8xl font-mono font-black italic hover:translate-x-2 xl:hover:-rotate-3 transition-transform"
                >
                  Blog
                </Link>
              </div>
            </div>

            <div className="w-full">
              <h4 className="text-2xl md:text-4xl font-mono font-semibold italic mb-6">
                Contact Me
              </h4>
              <form
                action={action}
                className="flex flex-col gap-4 max-w-lg mx-auto md:mx-0"
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Name"
                  defaultValue={state.values?.name}
                  className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 text-gray-50 placeholder:text-gray-300"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Email"
                  defaultValue={state.values?.email}
                  className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 text-gray-50 placeholder:text-gray-300"
                />
                <textarea
                  id="description"
                  name="description"
                  required
                  placeholder="What's up?"
                  defaultValue={state.values?.description}
                  className="px-4 py-2 w-full rounded-2xl border-gray-700 border bg-gray-800 min-h-40 md:min-h-64 resize-none text-gray-50 placeholder:text-gray-300"
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
          </div>
        </section>
      </main>
    </>
  );
}
