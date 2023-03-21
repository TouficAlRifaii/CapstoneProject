import React, { useState } from "react";

const AddUser = ({users, setUsers}) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [authorizationLevel, setAuthorizationLevel] = useState("");
  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, lastName, email, authorizationLevel);
        const newUser = {name, lastName, email, authorizationLevel}
        const allUsers=[ ...users, newUser]
        setUsers(allUsers)
        setName('');
        setEmail('')
        setLastName('');
        setAuthorizationLevel('');
      };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Add User</h1>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="authorization-level">Authorization Level:</label>
        <input
          type="text"
          id="authorization-level"
          value={authorizationLevel}
          onChange={(event) => setAuthorizationLevel(event.target.value)}
        />
      </div>
      <button type="submit">Add User</button>

    </form>
  );
};

export default AddUser;