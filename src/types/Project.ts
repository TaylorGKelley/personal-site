type Project = {
  title: string;
  content: Section[];
};

export type Section = {
  heading: string;
  body: (string | ImageBlock)[];
};
export type ImageBlock = {
  src: string;
  alt: string;
  caption?: string;
};

export default Project;
