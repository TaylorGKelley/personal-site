import { Link } from 'react-router';

export default function NavBar() {
  return (
    <header className="flex justify-between items-center p-12 max-w-[1440px] mx-auto">
      <h3 className="text-2xl font-semibold">Taylor Kelley</h3>
      <nav className="">
        <ul className="flex gap-12 items-center">
          <li>
            <Link to="/">Work</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
