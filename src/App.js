import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [formData, setFormData] = useState({
    id: "",  // Ensure ID is initialized
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Fetch users from JSONPlaceholder API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        const formattedUsers = data.map((user) => ({
          id: new Date().getTime() + Math.floor(Math.random() * 1000),  // Generate unique ID
          firstName: user.name.split(" ")[0] || "",
          lastName: user.name.split(" ")[1] || "",
          email: user.email,
          department: user.company ? user.company.name : "Default Department",
        }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      id: formData.id || new Date().getTime().toString(),  // Auto-generate ID
    });
  };

  // Handle adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      toast.error("All fields are required.");
      return;
    }

    const newUser = {
      id: formData.id || new Date().getTime().toString(), // Use generated ID if not provided
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
    };

    setUsers([...users, newUser]);
    setFormData({ id: "", firstName: "", lastName: "", email: "", department: "" });
    toast.success("User added successfully!");
  };

  // Start Editing
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditUserId(id);
    setEditData(userToEdit);
  };

  // Handle Inline Edit Changes
  const handleEditChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Update User
  const handleUpdate = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, ...editData } : user
    );
    setUsers(updatedUsers);
    setEditUserId(null);
    setEditData({ id: "", firstName: "", lastName: "", email: "", department: "" });
    toast.success("User updated successfully!");
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditUserId(null);
  };

  // Delete User
  const handleDelete = (id) => {
    const filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
    toast.success("User deleted successfully!");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">User Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser}>
        <div className="row g-3">
          <div className="col-md-2">
            <input
              type="text"
              name="id"
              value={formData.id}
              className="form-control"
              placeholder="ID (auto-generated)"
              readOnly
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="department"
              placeholder="Department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Add User
            </button>
          </div>
        </div>
      </form>

      {/* User List */}
      <table className="table table-striped table-hover mt-4">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editUserId === user.id ? (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input type="text" className="form-control" value={editData.firstName} onChange={(e) => handleEditChange(e, "firstName")} />
                </td>
                <td>
                  <input type="text" className="form-control" value={editData.lastName} onChange={(e) => handleEditChange(e, "lastName")} />
                </td>
                <td>
                  <input type="email" className="form-control" value={editData.email} onChange={(e) => handleEditChange(e, "email")} />
                </td>
                <td>
                  <input type="text" className="form-control" value={editData.department} onChange={(e) => handleEditChange(e, "department")} />
                </td>
                <td>
                  <button onClick={() => handleUpdate(user.id)} className="btn btn-success btn-sm me-2">Update</button>
                  <button onClick={handleCancelEdit} className="btn btn-secondary btn-sm">Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button onClick={() => handleEdit(user.id)} className="btn btn-primary btn-sm me-2">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default App;
