import React from 'react'
import Image from 'next/image'

export interface HeroProps {
  heading: string
  subheading?: string
}

export const Hero: React.FC<HeroProps> = ({ heading, subheading }) => {
  return (
    <section className="relative bg-gray-900 text-white py-24 px-6 min-h-[60vh] flex flex-col justify-center">
      {/*{backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt || 'Hero background'}
          fill
          className="object-cover opacity-40 z-0"
          priority
        />
      )}*/}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">{heading}</h1>
        {subheading && <p className="text-xl text-gray-300">{subheading}</p>}
      </div>
    </section>
  )
}
