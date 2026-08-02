'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { PayloadImage } from "@/components/PayloadImage";
import type { Project, Framework } from "@/payload-types";
import { ProjectBlock } from "@/payload-types";
import { ArrowUpRightIcon } from "lucide-react";

type ProjectProps = ProjectBlock;

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.85, 1, 1, 0.85],
  )

  const projectUrl = project.slug ? `/projects/${project.slug}` : undefined;

  return (
    <motion.a
      ref={ref}
      style={{ scale }}
      transition={{
        type: 'decay',
        stiffness: 10,
        damping: 10,
      }}
      href={projectUrl}
      area-label={`View ${project.title}`}
      className="group flex flex-col gap-6"
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-neutral-100 shadow-sm border border-neutral-200/60">
        <PayloadImage
          media={project.coverImage}
          altFallback={project.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-[1.005] transition-transform duration-500 ease-out"
        />
      </div>

      <div className="flex lg:grid lg:grid-cols-2 items-start justify-between gap-4 pt-2">
        <div className="space-y-3 max-w-2xl">
          {project.frameworks && project.frameworks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.frameworks.map((fwItem) => {
                const fw = typeof fwItem.framework === 'object' ? (fwItem.framework as Framework) : null;
                if (!fw?.name) return null;

                return (
                  <span
                    key={fwItem.id || fw.id}
                    className="px-3 py-1 text-xs uppercase font-mono font-medium bg-accent text-accent-foreground"
                  >
                    {fw.name}
                  </span>
                );
              })}
            </div>
          )}

          <h3 className="text-5xl md:text-4xl font-serif text-neutral-900 tracking-tight">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
              {project.subtitle}
            </p>
          )}
        </div>

        {projectUrl && (
          <div
            className="ml-auto w-12 h-12 rounded-full border border-gray-200 bg-muted group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-all duration-200 mt-1"
          >
            <ArrowUpRightIcon className="w-5 h-5 transition-transform duration-200 group-hover:rotate-45" />
          </div>
        )}
      </div>
    </motion.a>
  );
}

export const Projects: React.FC<ProjectProps> = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
      {projects.map((item) => {
        const project = typeof item.project === 'object' ? (item.project as Project) : null;
        if (!project) return null;

        return (
          <ProjectCard key={item.id || project.id} project={project} />
        );
      })}
    </section>
  );
};
