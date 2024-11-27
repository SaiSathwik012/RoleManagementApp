import React, { useState, useCallback } from 'react';
import '../styles/RoleManagement.css';

const RoleManagement = ({users, roles, setRoles, setUsers}) => {


    const [newRole, setNewRole] = useState({ name: '', permissions: [] });
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userRole, setUserRole] = useState("");
    const availablePermissions = ['Read', 'Write', 'Delete'];
    const handleAssignRoleToUser = ((userId, role) => {
        console.log(userId);
        console.log(role);
        setUsers((prev) =>
            prev.map((user) =>
                user.id === parseInt(userId) ? { ...user, role: role } : user
            )            
        );
        setSelectedUserId(null);
        alert("Role Updated successfully")
        console.log(users);
    });

    const hasPermission = (userRole, permission) => {
        const role = roles.find((r) => r.name === userRole);
        return role && role.permissions.includes(permission);
    };

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'permissions') {
            setNewRole((prev) => {
                const updatedPermissions = checked
                    ? [...prev.permissions, value]
                    : prev.permissions.filter((perm) => perm !== value);
                return { ...prev, permissions: updatedPermissions };
            });
        } else {
            setNewRole((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddRole = () => {
        if (!newRole.name || newRole.permissions.length === 0) {
            alert('Please fill in all fields');
            return;
        }
        setRoles((prev) => [...prev, { id: Date.now(), ...newRole }]);
        setNewRole({ name: '', permissions: [] });
    };

    const handleEditRole = (role) => {
        setNewRole({ name: role.name, permissions: [...role.permissions] });
        setEditingRoleId(role.id);
    };

    const handleSaveRole = () => {
        if (!newRole.name || newRole.permissions.length === 0) {
            alert('Please fill in all fields');
            return;
        }

        setRoles((prev) => {
            return prev.map((role) =>
                role.id === editingRoleId
                    ? { ...role, name: newRole.name, permissions: newRole.permissions }
                    : role
            );
        });
        setNewRole({ name: '', permissions: [] });
        setEditingRoleId(null);
    };

    const handleDeleteRole = (id) => {
        setRoles((prev) => prev.filter((role) => role.id !== id));
    };

    return (
        <div className="role-management">
            <h1>Role Management</h1>

            <div className="user-role-assignment">
                <h2>Assign Role to User</h2>
                <select
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    value={selectedUserId || ""}
                >
                    <option value="" disabled>Select a User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                {selectedUserId && (
                    <div>
                        <label>Assign Role</label>
                        <select
                            onChange={(e) => {
                                const selectedRole = e.target.value;
                                setUserRole(selectedRole);
                            }}
                            value={userRole}
                        >
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>{role.name}</option>
                            ))}
                        </select>
                        <button onClick={()=>handleAssignRoleToUser(selectedUserId, userRole)}> Update </button>
                    </div>
                )}
            </div>
            <div className="add-role">
                <h2>{editingRoleId ? 'Edit Role' : 'Add New Role'}</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Role Name"
                    value={newRole.name}
                    onChange={handleInputChange}
                />
                <div>
                    <label>Permissions</label>
                    <div>
                        {availablePermissions.map((permission) => (
                            <div key={permission}>
                                <input
                                    type="checkbox"
                                    name="permissions"
                                    value={permission}
                                    checked={newRole.permissions.includes(permission)}
                                    onChange={handleInputChange}
                                /> {permission}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={editingRoleId ? handleSaveRole : handleAddRole}>
                    {editingRoleId ? 'Save Role' : 'Add Role'}
                </button>
            </div>
            <div className="role-list">
                <h2>Existing Roles</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Permissions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>{role.permissions.join(', ')}</td>
                                <td>
                                    {hasPermission(role.name, 'Read') && (
                                        <button onClick={() => alert(`Viewing ${role.name} role`)}>View Roles</button>
                                    )}
                                    {hasPermission(role.name, 'Write') && (
                                        <button onClick={() => handleEditRole(role)}>Edit Roles</button>
                                    )}
                                    {hasPermission(role.name, 'Delete') && (
                                        <button onClick={() => handleDeleteRole(role.id)}>Delete Roles</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="access-content">
                <h2>Role-based Access Control</h2>
                <div>
                    {users.map((user) => (
                        <div key={user.id}>
                            <h3>{user.name} - Role: {user.role}</h3>
                            <p>
                                {hasPermission(user.role, 'Read') ? (
                                    <button>View Roles</button>
                                ) : (
                                    <button disabled>View Roles</button>
                                )}
                                {hasPermission(user.role, 'Write') && (
                                    <button>Edit Roles</button>
                                )}
                                {hasPermission(user.role, 'Delete') && (
                                    <button>Delete Roles</button>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoleManagement;
