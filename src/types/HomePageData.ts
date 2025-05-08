import type Project from './Project';

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

export default HomePageDataType;
