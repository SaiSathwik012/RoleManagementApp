import React, { useState } from 'react';
import '../styles/UserManagement.css';
import { FaFilter } from 'react-icons/fa'; 

const UserManagement = ({ users, roles, handleAddUser, handleEditUser, handleDeleteUser }) => {
    const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [showDropdown, setShowDropdown] = useState(false); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        if (!searchQuery) return users;
        const lowercasedQuery = searchQuery.toLowerCase();
        return users.filter((user) =>
            Object.values(user).some((value) =>
                String(value).toLowerCase().includes(lowercasedQuery)
            )
        );
    };

    const handleSort = (field) => {
        setSortField(field);
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        setShowDropdown(false);
    };

    const sortedUsers = () => {
        const filtered = handleSearch();
        if (!sortField) return filtered;

        return [...filtered].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        });
    };

    const handleAddOrEditUser = () => {
        if (!newUser.name || !newUser.email || !newUser.role || !newUser.status) {
            alert('Please fill in all fields');
            return;
        }

        if (isEditing) {
            handleEditUser(editId, newUser);
            setIsEditing(false);
            setEditId(null);
        } else {
            handleAddUser(newUser);
        }

        setNewUser({ name: '', email: '', role: '', status: '' });
    };

    const handleEditClick = (user) => {
        setNewUser(user);
        setIsEditing(true);
        setEditId(user.id);
    };

    return (
        <div className="user-management">
            <h1>User Management</h1>

            <div className="add-user">
                <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    id='name'
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    id='email'
                />
                <select  id='role' name="role" value={newUser.role} onChange={handleInputChange}>
                    <option value="">Select Role</option> 
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>
                <select id='status' name="status" value={newUser.status} onChange={handleInputChange}>
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button id="submit" onClick={handleAddOrEditUser}>{isEditing ? 'Update User' : 'Add User'}</button>
            </div>

            <div className="user-list">
                <h2>Existing Users</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    <div className="filter-container">
                        <button
                            className="filter-icon-btn"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <FaFilter />
                        </button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <button onClick={() => handleSort('name')}>Sort By Name</button>
                                <button onClick={() => handleSort('id')}>Sort By ID</button>
                                <button onClick={() => handleSort('email')}>Sort By Email</button>
                                <button onClick={() => handleSort('role')}>Sort By Role</button>
                            </div>
                        )}
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers().map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.status}</td>
                                <td>
                                    <button onClick={() => handleEditClick(user)}>Edit</button>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
