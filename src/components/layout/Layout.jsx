import React from 'react';
import TopBar from '../topbar/TopBar';
import { Outlet } from 'react-router-dom';
import NavBar from '../navbar/NavBar';

const Layout = () => {
  return (
    <div>
      <NavBar />
      <TopBar />
      <div className="main-content">
        <Outlet /> {/* This is where the routed content will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
