import { MoonIcon, SunIcon } from 'lucide-react';

import { useTheme } from '../context/ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); // toggle between themes
  };

  if (theme === 'dark') {
    return (
      <button className="p-2 rounded-md" onClick={handleClick}>
        <MoonIcon className="size-6" />
      </button>
    );
  } else {
    return (
      <button className="p-2 rounded-md" onClick={handleClick}>
        <SunIcon className="size-6" />
      </button>
    );
  }
}
