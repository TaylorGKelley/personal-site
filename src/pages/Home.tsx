import { Link } from 'react-router';
import data from '../data/homePage';
import isSameDate from '../utils/isSameDate';
import { dateFormatOptions } from '../utils/constants/dateFormatOptions';
import ProjectCard from '../components/ProjectCard';

function Home() {
  return (
    <>
      <header className="mb-9">
        <div className="min-h-48 w-full relative mb-8">
          <img
            className="absolute bottom-0 left-0 w-36 h-36 rounded-full shadow-xl"
            src="/images/profile.jpg"
          />
        </div>
        <h1 className="text-4xl font-semibold mb-4">Hi, I'm Taylor Kelley</h1>
        <h4 className="mb-2">Full-Stack Web Developer</h4>
        <p className="text-green-300 [&>a]:underline">
          <a href={data.link.linkedIn} target="_blank">
            LinkedIn
          </a>
          <span>{'  /  '}</span>
          <a href={data.link.gitHub} target="_blank">
            GitHub
          </a>
          <span>{'  /  '}</span>
          <a href={data.link.resume} download="Taylor Kelley | Resume.pdf">
            Resume
          </a>
        </p>
      </header>
      <main className="flex flex-col gap-8">
        <section>
          <h3 className="font-mono mb-2">About Me</h3>
          <p>{data.about.text}</p>
        </section>
        <section>
          <h3 className="font-mono mb-2">Experience</h3>
          <div className="grid grid-cols-2">
            {data.experience.data.map((exp) => (
              <div className="relative pl-3.5 after:content-[''] after:w-[3px] after:rounded-full after:absolute after:inset-y-0 after:left-0 after:bg-green-950 after:h-full">
                <h5>{exp.title}</h5>
                <div className="pl-1 mt-1">
                  <p className="font-mono">{exp.company}</p>
                  <p className="text-green-950">
                    <small>{`${exp.startDate.toLocaleDateString(
                      'en-US',
                      dateFormatOptions
                    )} - ${
                      isSameDate(exp.endDate, new Date(Date.now()))
                        ? 'Present'
                        : exp.endDate.toLocaleDateString(
                            'en-US',
                            dateFormatOptions
                          )
                    }`}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="font-mono mb-2">Portfolio</h3>
          <div className="grid grid-cols-2 gap-6 px-4">
            {data.portfolio.projects.map((project) => (
              <ProjectCard project={project} />
            ))}
          </div>
          <div className="px-4">
            <Link to="/projects">
              <small>See All Projects...</small>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
