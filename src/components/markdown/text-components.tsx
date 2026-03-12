import Link from "next/link";

export function h1({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${children}`}>
      <h1
        className="text-5xl font-semibold mt-4 mb-6 font-mono"
        id={children?.toString()}
      >
        {children}
      </h1>
    </Link>
  );
}

export function h2({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${children}`}>
      <h2
        className="text-4xl font-semibold mt-3 mb-5 font-mono"
        id={children?.toString()}
      >
        {children}
      </h2>
    </Link>
  );
}

export function h3({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${children}`}>
      <h3
        className="text-3xl font-medium mt-3 mb-4 font-mono"
        id={children?.toString()}
      >
        {children}
      </h3>
    </Link>
  );
}

export function h4({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${children}`}>
      <h4
        className="text-2xl font-medium mt-2 mb-3 font-mono"
        id={children?.toString()}
      >
        {children}
      </h4>
    </Link>
  );
}

export function h5({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${children}`}>
      <h5
        className="text-xl font-medium mt-2 mb-3 font-mono"
        id={children?.toString()}
      >
        {children}
      </h5>
    </Link>
  );
}

export function h6({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${children}`}>
      <h6 className="text-lg mt-1 mb-2 font-mono" id={children?.toString()}>
        {children}
      </h6>
      ;
    </Link>
  );
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
