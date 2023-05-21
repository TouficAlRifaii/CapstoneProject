import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//NOT USED - It may be added later
const Users = ({ users, setUsers }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(8);

  useEffect(() => {
    const filteredResults = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [users, search]);

  const handleDelete = (name) => {
    const usersList = users.filter((user) => user.name !== name);
    setUsers(usersList);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="list-section">
      <h1>Users</h1>
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search for users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Authorization Level</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user} className="list-row">
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.authorizationLevel}</td>
              <td>
                <button
                  onClick={() => handleDelete(user.name)}
                  className="delete-btn"
                >
                  Delete
                </button>
                <Link to={`/edituser/${user.name}`} className="edit-link">
                  <button className="edit-btn">Edit user</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`page-btn ${currentPage === number ? "active" : null}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <Link to="/AddUser" className="add-user-link">
        <button className="add-link-btn">Add user</button>
      </Link>
    </section>
  );
};

export default Users;
