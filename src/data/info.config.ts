export type Project = {
  coverImageSrc: string;
  slug: string; // unique identifier for use when navigating to project page
  title: string;
  description: string;
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
      slug: "auth-dashboard",
      title: "Auth Dashboard",
      description:
        "User-friendly dashboard for managing user accounts and security in your environment.",
    },
    {
      coverImageSrc: "/images/taylabs-auth.jpeg",
      slug: "auth-api",
      title: "Authentication API",
      description:
        "Secure and clean solution for managing user accounts and security in your application.",
    },
  ] satisfies Project[],
  workPlaces: [
    {
      jobTitle: "Full-Stack Software Developer",
      company: "Alabama Law Enforcement Agency",
      location: "Montgomery, AL",
      description:
        "Designing and developing web applications that give users a smooth, secure browsing experience.",
      startDate: new Date(2023, 6, 16),
    },
    {
      jobTitle: "System Administrator",
      company: "Alabama Medicaid Agency",
      location: "Montgomery, AL",
      description:
        "Keeping things up and running, setting up FTP automations, and generating reports on servers.",
      startDate: new Date(2021, 7, 16),
      endDate: new Date(2023, 6, 15),
    },
  ] satisfies WorkPlace[],
} as const;
