import { Link, useParams } from 'react-router';
import projects from '../data/projects';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import config from '../lib/config/react-markdown';

export default function Project() {
  const params = useParams<{ projectId: string }>();

  const project = projects.find((project) => project.id === params.projectId);

  if (!project) {
    return (
      <main className="flex flex-col items-center justify-center gap-4 max-w-5xl mx-auto h-[70svh]">
        <h1 className="text-4xl font-extralight">
          <i>404:&nbsp;</i>A project with that id doesn't exist
        </h1>
        <Link
          to="/"
          viewTransition
          className="underline underline-offset-4 flex gap-2 items-center text-lg text-gray-400">
          <ArrowLeft className="size-5" />
          <i>Back</i>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 max-w-5xl mx-auto">
      <img src={project.coverImageSrc} className="w-full object-cover h-80" />
      <h1 className="text-5xl">{project.title}</h1>
      <article>
        <ReactMarkdown components={config}>{project.markdown}</ReactMarkdown>
      </article>
    </main>
  );
}
