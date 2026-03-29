import { cn } from "@/src/utils/tw";
import { ComponentProps } from "@m2d/react-markdown/utils";
import Link, { type LinkProps } from "next/link";

function formatId(children: string = "") {
  const result = children
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  return result;
}

export function h1({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${formatId(children?.toString())}`}>
      <h1
        className="text-5xl font-bold mt-8 mb-6 font-mono"
        id={formatId(children?.toString())}
      >
        {children}
      </h1>
    </Link>
  );
}

export function h2({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${formatId(children?.toString())}`}>
      <h2
        className="text-4xl font-bold mt-8 mb-5 font-mono"
        id={formatId(children?.toString())}
      >
        {children}
      </h2>
    </Link>
  );
}

export function h3({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${formatId(children?.toString())}`}>
      <h3
        className="text-3xl font-semibold mt-6 mb-4 font-mono"
        id={formatId(children?.toString())}
      >
        {children}
      </h3>
    </Link>
  );
}

export function h4({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${formatId(children?.toString())}`}>
      <h4
        className="text-2xl font-semibold mt-6 mb-3 font-mono"
        id={formatId(children?.toString())}
      >
        {children}
      </h4>
    </Link>
  );
}

export function h5({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${formatId(children?.toString())}`}>
      <h5
        className="text-xl font-medium mt-6 mb-3 font-mono"
        id={formatId(children?.toString())}
      >
        {children}
      </h5>
    </Link>
  );
}

export function h6({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <Link href={`#${formatId(children?.toString())}`}>
      <h6
        className="text-lg font-bold mt-4 mb-2 font-mono"
        id={formatId(children?.toString())}
      >
        {children}
      </h6>
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

export function a({ children, ...props }: Readonly<ComponentProps>) {
  return (
    <Link
      {...(props as object as Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        keyof LinkProps<any>
      > &
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        LinkProps<any>)}
      className="hover:text-gray-600 visited:text-gray-900 transition-colors text-gray-700 underline mx-px"
      target="_blank"
    >
      {children}
    </Link>
  );
}

export function strong({ children }: Readonly<React.PropsWithChildren>) {
  return <strong className="font-semibold">{children}</strong>;
}

export function hr({ className, ...props }: Readonly<ComponentProps>) {
  return (
    <hr
      className={cn("my-6 border-t-gray-600", className)}
      {...(props as React.HTMLAttributes<HTMLHRElement>)}
    />
  );
}

export function li({ className, ...props }: Readonly<ComponentProps>) {
  return (
    <li
      className={cn("ml-4 mb-3 list-disc", className)}
      {...(props as React.HTMLAttributes<HTMLLIElement>)}
    />
  );
}
