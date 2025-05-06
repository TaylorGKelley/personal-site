import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Outlet />
    </div>
  );
}

export default MainLayout;
