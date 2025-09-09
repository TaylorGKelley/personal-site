import { useParams } from 'react-router';

export default function Project() {
  const params = useParams<{ projectId: string }>();

  return <main>Project: {params.projectId}</main>;
}
