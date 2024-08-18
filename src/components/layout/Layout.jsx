import React from 'react';
import TopBar from '../topbar/TopBar';
import SideBar from '../sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <SideBar />
      <TopBar />
      <div className="main-content">
        <Outlet /> {/* This is where the routed content will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
