export default function Footer() {
	return (
		<footer className='py-20 flex flex-col gap-2 text-center text-gray-600 dark:text-gray-300'>
			<div>
				<a
					href='mailto:contact@taylorkelley.dev'
					className='hover:underline underline-offset-4'>
					Email
				</a>
				{' | '}
				<a
					href='https://linkedin.com/in/taylor-g-kelley'
					className='hover:underline underline-offset-4'>
					LinkedIn
				</a>
				{' | '}
				<a
					href='https://github.com/TaylorGKelley'
					className='hover:underline underline-offset-4'>
					GitHub
				</a>
			</div>
			<p>© 2025 Taylor Kelley</p>
		</footer>
	);
}
