import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';

const App = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Inactive' },
    ]);

    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
        { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
    ]);

    // Add a new user with a serial ID
    const handleAddUser = (newUser) => {
        const newUserWithId = { id: users.length + 1, ...newUser }; // Serial ID logic
        setUsers((prev) => [...prev, newUserWithId]);
    };

    // Edit an existing user
    const handleEditUser = (id, updatedUser) => {
        setUsers((prev) =>
            prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
        );
    };

    // Delete a user
    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    // Add a new role
    const handleAddRole = (newRole) => {
        setRoles((prev) => [...prev, { id: roles.length + 1, ...newRole }]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard users={users} />} />
                    <Route
                        path="users"
                        element={
                            <UserManagement
                                users={users}
                                roles={roles}
                                handleAddUser={handleAddUser}
                                handleEditUser={handleEditUser}
                                handleDeleteUser={handleDeleteUser}
                            />
                        }
                    />
                    <Route
                        path="roles"
                        element={<RoleManagement roles={roles} handleAddRole={handleAddRole} />}
                    />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
