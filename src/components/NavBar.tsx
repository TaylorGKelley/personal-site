import { Link, useLocation } from 'react-router';
import { cn } from '../utils/tw';

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <header className="flex justify-between items-center p-4 md:p-12 max-w-[1440px] mx-auto">
      <h3 className="text-2xl font-semibold">Taylor Kelley</h3>
      <nav className="">
        <ul className="flex sm:gap-12 gap-6 items-center">
          <li
            className={cn(
              'before:h-0.5 before:w-full before:scale-x-0 hover:before:scale-x-100 before:bg-white before:block before:absolute relative before:-top-1.5 before:transition-transform',
              {
                'before:scale-x-100': pathname === '/',
              }
            )}>
            <Link to="/" viewTransition>
              Work
            </Link>
          </li>
          <li
            className={cn(
              'before:h-0.5 before:w-full before:scale-x-0 hover:before:scale-x-100 before:bg-white before:block before:absolute relative before:-top-2 before:transition-transform',
              {
                'before:scale-x-100': pathname === '/about',
              }
            )}>
            <Link to="/about" viewTransition>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
