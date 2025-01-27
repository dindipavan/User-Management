import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: "", // ID for new users
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [editData, setEditData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // Function to generate a random 6-digit number
  const generateRandomID = () => Math.floor(Math.random() * 900000) + 100000;

  // Fetch users from JSONPlaceholder API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        const formattedUsers = data.map((user) => ({
          id: generateRandomID(),  // Generate a random 6-digit ID for existing users
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

  // Handle adding a new user
  const handleAddUser = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      alert("All fields are required.");
      return;
    }

    const newUser = {
      id: formData.id || generateRandomID(), // Use random ID if not provided
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
    };

    // Add the new user to the state
    setUsers([...users, newUser]);
    setFormData({ id: "", firstName: "", lastName: "", email: "", department: "" });
  };

  // Handle editing a user
  const handleEditUser = (e) => {
    e.preventDefault();

    if (!editData.firstName || !editData.lastName || !editData.email || !editData.department) {
      alert("All fields are required.");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === editData.id ? { ...user, ...editData } : user
    );
    setUsers(updatedUsers);
    setEditData({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
  };

  // Handle user input changes for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle editing user input changes
  const handleEditChange = (e, field) => {
    const { value } = e.target;
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  // Handle editing a user
  const handleEditClick = (user) => {
    setEditData(user);
  };

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-5">
      <h1>User Management</h1>

      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="form-inline">
        <input
          type="number"
          name="id"
          value={formData.id}
          onChange={handleChange}
          className="form-control mr-2"
          placeholder="ID (enter manually or auto-generate)"
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control mr-2"
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control mr-2"
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control mr-2"
          placeholder="Email"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="form-control mr-2"
          placeholder="Department"
        />
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>

      {/* Edit User Form */}
      {editData.id && (
        <form onSubmit={handleEditUser} className="form-inline mt-3">
          <input
            type="number"
            value={editData.id}
            onChange={(e) => handleEditChange(e, "id")}
            className="form-control mr-2"
          />
          <input
            type="text"
            value={editData.firstName}
            onChange={(e) => handleEditChange(e, "firstName")}
            className="form-control mr-2"
          />
          <input
            type="text"
            value={editData.lastName}
            onChange={(e) => handleEditChange(e, "lastName")}
            className="form-control mr-2"
          />
          <input
            type="email"
            value={editData.email}
            onChange={(e) => handleEditChange(e, "email")}
            className="form-control mr-2"
          />
          <input
            type="text"
            value={editData.department}
            onChange={(e) => handleEditChange(e, "department")}
            className="form-control mr-2"
          />
          <button type="submit" className="btn btn-warning">Update User</button>
        </form>
      )}

      {/* Users Table */}
      <table className="table mt-4">
        <thead>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.department}</td>
              <td>
                <button onClick={() => handleEditClick(user)} className="btn btn-warning mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
