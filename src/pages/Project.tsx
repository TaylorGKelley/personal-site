import { useParams } from 'react-router';
import projects from '../data/projects';

export default function Project() {
  const params = useParams<{ projectId: string }>();

  return (
    <main>
      Project:{' '}
      {projects.find((project) => project.id === params.projectId)?.title}
    </main>
  );
}
