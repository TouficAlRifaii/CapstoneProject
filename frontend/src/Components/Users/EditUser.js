import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../CSS/forms.css"; // Import your CSS file for navbar styling

const EditUser = ({ users, setUsers }) => {
  const navigate = useNavigate();

  const { name } = useParams();
  const [user, setUser] = useState(users.find((user) => user.name === name));

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUsers = users.map((u) => {
      if (u.name === user.name) {
        return user;
      }
      return u;
    });
    setUsers(updatedUsers);
    navigate("/users");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit User</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={user.lastName}
          onChange={(event) =>
            setUser({ ...user, lastName: event.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
      </div>
      <div>
        <label htmlFor="authorization-level">Authorization Level:</label>
        <input
          type="text"
          id="authorization-level"
          value={user.authorizationLevel}
          onChange={(event) =>
            setUser({ ...user, authorizationLevel: event.target.value })
          }
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUser;
