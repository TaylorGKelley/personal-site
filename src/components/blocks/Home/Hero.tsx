import { ArrowDownIcon } from "lucide-react";

type HeroProps = {
  data: Hero;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className="h-[75svh] flex justify-center items-center">
      <h1 className='text-4xl'>{data.heading}</h1>
      <h4 className='text-lg text-muted-foreground'>{data.subheading}</h4>
      <div>
      <p className='font-mono text-sm text-muted-foreground'>{data.actionText}</p>
        <div className='h-12 w-12 flex justify-center items-center border-secondary rounded-full'>
          <ArrowDownIcon className='text-primary w-4 h-4'/>
        </div>
      </div>
    </section>
  );
}
