import { DownloadIcon } from 'lucide-react';

export default function About() {
  return (
    <main className="flex flex-col gap-8 max-w-5xl mx-auto">
      <section className="grid sm:grid-cols-2 md:gap-16 gap-8 sm:py-36 py-20">
        <img
          src="/images/about-me.jpg"
          className="min-w-sm w-full h-full object-cover"
        />
        <div>
          <h3 className="flex gap-4 items-center mb-4 text-4xl font-semibold group">
            <span>Hi, I'm Taylor</span>
            <span className="group-hover:animate-wave">
              <img
                src="/images/wave-emoji.png"
                className="aspect-square size-10"
              />
            </span>
          </h3>
          <p className="leading-7">
            A Software Developer specializing in clean user experiences and
            reliable backend systems. I love building full-stack applications
            that balance great design with a strong technical foundation. On the
            front-end I focus on creating smooth and accessible interfaces with
            React and Next.js, while on the backend I design APIs and services
            that are secure and maintainable.
          </p>
          <br />
          <p className="leading-7">
            I am currently looking for opportunities as a full-stack or frontend
            focused developer where I can continue building clean and
            maintainable sites with a memorable user experience.
          </p>
          <br />
          <a
            href="/documents/Resume - Taylor Kelley.pdf"
            target="_blank"
            className="flex gap-2 items-center pl-4 pr-5 py-2 rounded-2xl hover:bg-gray-50/90 text-black transition-colors cursor-pointer bg-gray-50 w-min">
            <DownloadIcon className="size-4" />
            <span>Resume</span>
          </a>
        </div>
      </section>
    </main>
  );
}
