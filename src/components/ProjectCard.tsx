import type Project from '../types/Project';

type ProjectCardProps = {
  project: Project;
};

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative bg-gray-500 rounded-2xl overflow-hidden shadow-xl aspect-video">
      <img src={project.imgSrc} className="w-full h-full object-cover" />
      <div className="absolute px-4 py-3 [&>*]:z-10 before:bg-green-900/75 before:content-[''] before:absolute before:inset-0 inset-0 rounded-lg flex flex-col h-full text-green-50">
        <p className="flex-auto">
          <small>{project.description}</small>
        </p>
        <h5>{project.title}</h5>
      </div>
    </div>
  );
}

export default ProjectCard;
