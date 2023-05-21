import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // code to handle login logic
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h1 className="add-form-title">Login</h1>

      <div className="add-form-input">
        <label htmlFor="email">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="add-input-field"
        />
      </div>
      <div className="add-form-input">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="add-input-field"
        />
      </div>
      <button type="submit" className="add-form-submit">
        Login
      </button>
    </form>
  );
};

export default Login;
