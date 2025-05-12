import { Link } from 'react-router';
import type Project from '../types/Project';

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="relative bg-gray-500 rounded-2xl overflow-hidden shadow-xl aspect-video">
      <img src={project.imgSrc} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 inset-x-0 m-2 py-2 px-3 [&>*]:z-10 bg-green-900/90 rounded-lg flex flex-col justify-end text-green-50">
        <h5>{project.title}</h5>
      </div>
    </Link>
  );
}

export default ProjectCard;
