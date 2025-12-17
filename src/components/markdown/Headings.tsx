import React from 'react';

function Heading1({ children }: React.PropsWithChildren) {
	return <h3 className='text-6xl font-semibold mb-4 mt-4'>{children}</h3>;
}

function Heading2({ children }: React.PropsWithChildren) {
	return <h4 className='text-4xl font-semibold mb-5 mt-4'>{children}</h4>;
}

function Heading3({ children }: React.PropsWithChildren) {
	return <h5 className='text-2xl font-semibold mb-8 mt-4'>{children}</h5>;
}

export { Heading1, Heading2, Heading3 };
