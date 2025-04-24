import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="app-container">
    <nav className="sidebar" style={{width:"10vw"}}>
      <div style={{display: "flex", flexDirection: "column", gap: "30px"}}>
        <h2>Studio Ghibli</h2>
        <Link to="/">Dashboard</Link>
      </div>
    </nav>
    <div style={{width: "88vw"}}>
      <Outlet />
    </div>
  </div>
);

export default Layout;
