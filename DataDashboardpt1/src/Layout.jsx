import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="app-container">
    <nav className="sidebar">
      <h2>Studio Ghibli</h2>
      <Link to="/">Dashboard</Link>
    </nav>
    <main className="main-content">
      <Outlet />
    </main>
  </div>
);

export default Layout;
