import React, { Component } from 'react';

class UserForm extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    isEdit: false, // Tracks if the form is in edit mode
  };

  componentDidUpdate(prevProps) {
    if (prevProps.editUser !== this.props.editUser && this.props.editUser) {
      const { id, name, email, company } = this.props.editUser;
      const [firstName, lastName] = name.split(' ');

      this.setState({
        id,
        firstName,
        lastName,
        email,
        department: company.name,
        isEdit: true,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { id, firstName, lastName, email, department, isEdit } = this.state;

    const user = {
      id: isEdit ? id : Math.random(),
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    };

    if (isEdit) {
      this.props.updateUser(user);
    } else {
      this.props.addUser(user);
    }

    // Reset form
    this.setState({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      isEdit: false,
    });
  };

  render() {
    const {firstName, lastName, email, department, isEdit } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={this.handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={this.handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={this.handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="department"
          value={department}
          onChange={this.handleChange}
          placeholder="Department"
          required
        />
        <button type="submit">{isEdit ? 'Update User' : 'Add User'}</button>
      </form>
    );
  }
}

export default UserForm;
