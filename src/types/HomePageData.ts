import projects from '../data/projects';

type HomePageDataType = {
  link: {
    linkedIn: string;
    gitHub: string;
    resume: string;
  };
  about: {
    text: string;
  };
  experience: {
    data: {
      title: string;
      company: string;
      startDate: Date;
      endDate: Date;
    }[];
  };
  portfolio: {
    projects: Project[];
  };
};

type Project = {
  id: (typeof projects)[number]['id'];
  imgSrc: string;
  title: string;
};

export default HomePageDataType;
