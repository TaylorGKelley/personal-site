export function h1({ children }: Readonly<React.PropsWithChildren>) {
  return <h1 className="text-5xl">{children}</h1>;
}

export function h2({ children }: Readonly<React.PropsWithChildren>) {
  return <h2 className="text-4xl">{children}</h2>;
}

export function h3({ children }: Readonly<React.PropsWithChildren>) {
  return <h3 className="text-3xl">{children}</h3>;
}

export function h4({ children }: Readonly<React.PropsWithChildren>) {
  return <h4 className="text-2xl">{children}</h4>;
}

export function h5({ children }: Readonly<React.PropsWithChildren>) {
  return <h5 className="text-xl">{children}</h5>;
}

export function h6({ children }: Readonly<React.PropsWithChildren>) {
  return <h6 className="text-lg">{children}</h6>;
}

export function p({ children }: Readonly<React.PropsWithChildren>) {
  return <p className="text-base">{children}</p>;
}

export function blockquote({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
      {children}
    </blockquote>
  );
}
