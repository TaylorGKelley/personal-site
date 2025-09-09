import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';
import Project from './pages/Project';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeProvider';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: '/about', Component: About },
      {
        path: '/project/:projectId',

        Component: Project,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
