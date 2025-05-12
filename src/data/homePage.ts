import type HomePageData from '../types/HomePageData';

const homePage: HomePageData = {
  link: {
    linkedIn: 'https://linkedin.com/in/taylor-g-kelley',
    gitHub: 'https://github.com/TaylorGKelley',
    resume: '/resume.pdf',
  },
  about: {
    text: `I'm a full-stack developer with a strong focus in TypeScript and modern web technologies, building everything from responsive frontends to scalable backend systems. I enjoy creating clean, intuitive user experiences in React.js, while architecting reliable APIs using Node.js and PostgreSQL. `,
  },
  experience: {
    data: [
      {
        title: 'Software Developer',
        company: 'Alabama Law Enforcement Agency',
        startDate: new Date(2023, 6, 16),
        endDate: new Date(Date.now()),
      },
      {
        title: 'System Admin',
        company: 'Alabama Medicaid Agency',
        startDate: new Date(2021, 8, 16),
        endDate: new Date(2023, 6, 15),
      },
    ],
  },
  portfolio: {
    projects: [
      {
        id: 1,
        imgSrc: '/images/authService.png',
        title: 'Auth Service (API)',
      },
      {
        id: 2,
        imgSrc: '/images/findMyMoney.png',
        title: 'Project Title',
      },
    ],
  },
};

export default homePage;
