export function h1({ children }: Readonly<React.PropsWithChildren>) {
  return <h1 className="text-5xl font-semibold mt-4 mb-6">{children}</h1>;
}

export function h2({ children }: Readonly<React.PropsWithChildren>) {
  return <h2 className="text-4xl font-semibold mt-3 mb-5">{children}</h2>;
}

export function h3({ children }: Readonly<React.PropsWithChildren>) {
  return <h3 className="text-3xl font-medium mt-3 mb-4">{children}</h3>;
}

export function h4({ children }: Readonly<React.PropsWithChildren>) {
  return <h4 className="text-2xl font-medium mt-2 mb-3">{children}</h4>;
}

export function h5({ children }: Readonly<React.PropsWithChildren>) {
  return <h5 className="text-xl font-medium mt-2 mb-3">{children}</h5>;
}

export function h6({ children }: Readonly<React.PropsWithChildren>) {
  return <h6 className="text-lg mt-1 mb-2">{children}</h6>;
}

export function p({ children }: Readonly<React.PropsWithChildren>) {
  return <p className="text-base font-light mt-1 mb-2">{children}</p>;
}

export function blockquote({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <blockquote className="border-l-4 border-gray-300 bg-gray-100 pl-4 italic text-gray-800 my-4">
      {children}
    </blockquote>
  );
}
