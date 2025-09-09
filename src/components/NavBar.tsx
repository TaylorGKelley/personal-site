import { Link } from 'react-router';
import { ThemeToggle } from './ThemeToggle';

export default function NavBar() {
  return (
    <header className="flex justify-between items-center">
      <h3 className="text-2xl font-semibold">Taylor Kelley</h3>
      <nav className="flex items-center">
        <ul className="flex gap-12">
          <li>
            <Link to="/">Work</Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
