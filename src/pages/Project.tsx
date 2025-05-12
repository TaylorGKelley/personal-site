import { Link, useParams } from 'react-router';
import projects from '../data/projects';
import invalidProjectData from '../data/projects/invalidProject';
import { type ImageBlock as ImageBlockType } from '../types/Project';
import ImageBlock from '../components/ImageBlock';

function Project() {
  const params = useParams<{ projectId: string }>();
  const project =
    params.projectId &&
    (projects.map((entry) => entry.id) as number[]).includes(
      parseInt(params.projectId)
    )
      ? projects.find((project) => project.id === parseInt(params.projectId!))!
          .project
      : invalidProjectData;

  return (
    <>
      <header>
        <Link to="/">{'<- Home'}</Link>
        <h1 className="font-mono">{project.title}</h1>
      </header>
      <main>
        {project.content.map((section) => (
          <section>
            <h3 className="font-mono">{section.heading}</h3>
            {section.body.map((block) =>
              typeof block === 'string' ? (
                <p>{block}</p>
              ) : (
                <ImageBlock image={block as ImageBlockType} />
              )
            )}
          </section>
        ))}
      </main>
    </>
  );
}

export default Project;
