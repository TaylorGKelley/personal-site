import { Link } from 'react-router';
import projects from '../data/projects';
import workPlaces from '../data/workPlaces';
import formatDate from '../utils/formatDate';
import { cn } from '../utils/tw';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col gap-8 max-w-5xl mx-auto">
      <section className="flex justify-center items-center sm:py-32 py-20 px-4">
        <h1 className="text-6xl max-lg:sm:text-[calc(3*1.4vw+1rem)] max-sm:text-4xl">
          Taylor Kelley is a Full Stack Software Developer working at{' '}
          <span className="text-gray-400">
            Alabama's Law Enforcement Agency
          </span>
        </h1>
      </section>
      <section className="grid gap-36 py-20 px-4">
        {projects.map((project, i) => (
          <div className="grid md:grid-cols-2 items-center md:gap-24 gap-8 ">
            <img
              src={project.coverImageSrc}
              className={cn(
                'object-cover max-w-md w-full aspect-video h-full max-md:mx-auto',
                {
                  'md:order-2': i % 2 != 0,
                }
              )}
            />
            <div
              className={cn(
                'grid gap-4 max-md:mx-auto max-w-md max-md:text-center',
                {
                  'md:order-1': i % 2 != 0,
                }
              )}>
              <h3 className="text-4xl ">{project.title}</h3>
              <p className="text-xl ">{project.description}</p>
              <Link
                to={`projects/${project.id}`}
                className="flex gap-2 hover:gap-3 transition-all ease-in-out items-center hover:underline underline-offset-4 max-md:mx-auto"
                viewTransition>
                <span>Learn More</span>
                <ArrowRight className="size-4" />
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
          {workPlaces.map((workPlace) => (
            <div className="grid md:grid-cols-2 md:gap-16 gap-4">
              <h4 className="md:text-4xl text-3xl italic">
                {workPlace.jobTitle}
              </h4>
              <div className="grid gap-4">
                <h5 className="text-2xl max-md:text-gray-300 max-md:text-xl">
                  {workPlace.company}
                </h5>
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
