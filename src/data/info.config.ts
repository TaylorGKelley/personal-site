export type Project = {
  coverImageSrc: string;
  title: string;
  url: string;
  description: string;
  slug: string;
};

export type WorkPlace = {
  jobTitle: string;
  company: string;
  location: string;
  description: string;
  startDate: Date;
  endDate?: Date;
};

export default {
  projects: [
    {
      coverImageSrc: "/images/taylabs-auth.jpeg",
      title: "Auth and User Management API",
      url: "https://taylabs.taylorkelley.dev/",
      description:
        "Easy, self-hostable user management to have ownership over your data without writing single line of code",
      slug: "auth-api",
    },
    {
      coverImageSrc: "/images/markdown-blog.jpeg",
      title: "Static Markdown-based Blog",
      url: "/blog",
      description:
        "Easy to manage blog posts with Markdown syntax and GitHub based management",
      slug: "markdown-blog",
    },
    {
      coverImageSrc: "/images/rich-text-blazor.jpeg",
      title: "Rich Text Editor for Blazor",
      url: "https://blazor-ui.taylorkelley.dev/rich-text-editor",
      description:
        "Fully featured rich text editor for Blazor, conquering challenges with the Virtual-DOM and XSS prevention",
      slug: "rich-text-blazor",
    },
  ] satisfies Project[],
  contact: {
    github: "https://github.com/TaylorGKelley",
    linkedin: "https://www.linkedin.com/in/taylor-g-kelley",
    youtube: "https://youtube.com/@taylorkelley_dev",
    blog: "/blog",
  },
} as const;
