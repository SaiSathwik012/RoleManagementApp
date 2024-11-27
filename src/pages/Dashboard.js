import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/Dashboard.css';

const Dashboard = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [inputValue, setInputValue] = useState(''); 

    const handleSearchButtonClick = () => {
        setSearchTerm(inputValue.toLowerCase());
        toast.info('Searching...'); 
    };

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        toast.success(`Sorted by ${field} (${order})`); 
    };

    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.id.toString().includes(searchTerm)
        )
        .sort((a, b) => {
            if (!sortField) return 0;
            const aValue = a[sortField];
            const bValue = b[sortField];
            return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
        });

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>User Dashboard</h1>
                <div className="dashboard-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search by ID, Name, or Email"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="search-bar"
                        />
                        <button className="search-button" onClick={handleSearchButtonClick}>
                            Search
                        </button>
                        <div className="filter-dropdown-container">
                            <button className="filter-button">
                                <i className="fas fa-filter"></i>
                            </button>
                            <div className="dropdown-content">
                                <p onClick={() => handleSort('id')}>ID</p>
                                <p onClick={() => handleSort('name')}>Name</p>
                                <p onClick={() => handleSort('email')}>Email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-widgets">
                <div className="widget">
                    <h3>Users</h3>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>ID {sortField === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                                <th onClick={() => handleSort('name')}>Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
