import { Link } from 'react-router';
import projects from '../data/projects';
import workPlaces from '../data/workPlaces';
import formatDate from '../utils/formatDate';
import { cn } from '../utils/tw';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 max-w-5xl mx-auto">
      <section className="flex justify-center items-center py-32">
        <h1 className="text-6xl">
          Taylor Kelley is a Full Stack Software Developer working at{' '}
          <span className="text-gray-400">
            Alabama's Law Enforcement Agency
          </span>
        </h1>
      </section>
      <section className="grid gap-36 py-20">
        {projects.map((project, i) => (
          <div className="grid grid-cols-2 items-center gap-24">
            <img
              src={project.coverImageSrc}
              className={cn('object-cover w-md h-72', {
                'order-2': i % 2 != 0,
              })}
            />
            <div
              className={cn('grid gap-4', {
                'order-1': i % 2 != 0,
              })}>
              <h3 className="text-4xl">{project.title}</h3>
              <p className="text-xl">{project.description}</p>
              <Link
                to={`projects/${project.id}`}
                className="flex gap-2 hover:gap-3 transition-all ease-in-out items-center hover:underline underline-offset-4">
                <span>Learn More</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3 className="font-bold text-6xl text-gray-600">Where I Worked</h3>
        <div className="grid gap-36 py-24">
          {workPlaces.map((workPlace) => (
            <div className="grid grid-cols-2 gap-16">
              <h4 className="text-4xl italic">{workPlace.jobTitle}</h4>
              <div className="grid gap-4">
                <h5 className="text-2xl">{workPlace.company}</h5>
                <p className="text-gray-300">{workPlace.description}</p>
                <p className="text-gray-300 italic">{`${
                  workPlace.location
                } - ${formatDate(workPlace.startDate)} - ${
                  workPlace.endDate ? formatDate(workPlace.endDate) : 'Present'
                }`}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
