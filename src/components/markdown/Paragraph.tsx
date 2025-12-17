import React from 'react';

function Paragraph({ children }: React.PropsWithChildren) {
	return <p className='my-2'>{children}</p>;
}

function List({ children }: React.PropsWithChildren) {
	return <li className='my-2'>{children}</li>;
}

function UnorderedList({ children }: React.PropsWithChildren) {
	return <ul className='ml-6 my-4 list-disc'>{children}</ul>;
}

function Link({ children, href }: React.PropsWithChildren & { href: string }) {
	return (
		<a href={href} target='_blank' className='text-underline'>
			{children}
		</a>
	);
}

export { Paragraph, List, UnorderedList, Link };
