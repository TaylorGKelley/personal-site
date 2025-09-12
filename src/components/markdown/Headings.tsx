import React from 'react';

function Heading1({ children }: React.PropsWithChildren) {
  return <h3 className="text-3xl">{children}</h3>;
}

function Heading2({ children }: React.PropsWithChildren) {
  return <h4 className="text-2xl">{children}</h4>;
}

function Heading3({ children }: React.PropsWithChildren) {
  return <h5 className="text-lg">{children}</h5>;
}

export { Heading1, Heading2, Heading3 };
