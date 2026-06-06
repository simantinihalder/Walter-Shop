import React from 'react';
import { Outlet } from 'react-router-dom';
import StickyNavbar from './StickyNavbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StickyNavbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
