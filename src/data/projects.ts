import { type UUID } from 'node:crypto';

export type Project = {
  id: UUID;
  coverImageSrc: string;
  title: string;
  description: string;
};

const projects = [
  {
    id: '37e4de29-bdb6-4482-82f2-744c65cfd84b' as UUID,
    coverImageSrc: '/images/prosperity-cover.jpg',
    title: 'Prosperity',
    description:
      'A simple and easy to use budgeting app for the everyday person, built with TypeScript, React, and GraphQL.',
  },
  {
    id: '55626c40-f50d-4bef-ade6-8792a1aaebee' as UUID,
    coverImageSrc: '/images/prosperity-cover.jpg',
    title: 'Auth Service API',
    description:
      'Secure and clean solution for managing user accounts and security in your application.',
  },
] as Project[];

export default projects;
