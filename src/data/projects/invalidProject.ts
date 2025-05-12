import Project from '../../types/Project';

const invalidProjectData: Project = {
  title: 'Invalid Project Id',
  content: [
    {
      heading: '',
      body: [''],
    },
  ],
} as const;

export default invalidProjectData;
