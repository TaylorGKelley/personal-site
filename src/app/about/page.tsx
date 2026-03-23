import { DownloadIcon } from "lucide-react";
import Link from "next/link";

const maskStyle = {
  WebkitMaskImage:
    "linear-gradient(to bottom, black 0%, transparent 30%, transparent 50%, black 100%)",
  maskImage:
    "linear-gradient(to bottom, black 0%, transparent 30%, transparent 50%, black 100%)",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-8">
      <section className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-16 md:h-[70vh] p-4">
        <div className="h-full min-h-96 w-full bg-gray-500 rounded-2xl relative overflow-clip shadow-lg hover:[&>img]:scale-105 hover:rotate-2 transition-transform">
          <img
            src="images/taylabs-auth.jpeg"
            alt="Taylor Kelley"
            className="w-full h-full object-cover transition-transform"
          />
          <div
            className="absolute inset-0 flex flex-col justify-between backdrop-blur-md"
            style={maskStyle}
          ></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 ">
            <h1 className="text-white font-bold font-mono text-2xl md:text-5xl">
              I&apos;m Taylor Kelley
            </h1>
            <p className="text-white text-right self-end w-5/6 md:text-base text-sm">
              I&apos;m a Full-Stack Software Developer who loves to make sleak
              UIs, write clean code, and create solutions with a real impact.
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-mono font-bold text-4xl mb-4">About me</h2>
          <p className="text-gray-600 text-lg mb-4">
            I am a Full-Stack Software Developer with expertise in TypeScript
            and C# development stacks. I have a passion for building scalable
            web apps and a slight obsession with ergonomic keyboards and
            homelabs.
          </p>
          <p className="text-gray-600 text-lg">
            If I’m not at my desk, you’ll probably find me at the woodshop or in
            the middle of a home improvement project. I value clean code,
            minimalist aesthetics, and a good challenge.
          </p>
          <Link
            href="/docs/resume.pdf"
            className="mt-6 bg-white text-gray-900 font-bold py-3 px-6 rounded-full
                      hover:bg-gray-800 hover:text-gray-50 transition-colors
                      inline-grid grid-cols-[auto_1fr] gap-2"
            target="_blank"
          >
            <DownloadIcon />
            <span>View Resume</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
