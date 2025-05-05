import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import MainLayout from './pages/MainLayout';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [{ index: true, Component: Home }],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
