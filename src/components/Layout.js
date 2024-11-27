import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Layout.css';

const Layout = () => {
    return (
        <div className="layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo">RBAC Dashboard</div>
                <nav>
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li><Link to="/users">User Management</Link></li>
                        <li><Link to="/roles">Role Management</Link></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="content">
                <header className="header">
                    <div className="title">Welcome to RBAC Dashboard</div>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
