import React from "react";
//import "./Home.css"; // Import the CSS file
//users functionalities are in App
import { useState, useEffect} from 'react' ;
import { Link } from 'react-router-dom';

const Users = ({users, setUsers}) =>{

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const filteredResults = users.filter((user) =>
      ((user.name).toLowerCase()).includes(search.toLowerCase())
      || ((user.lastName).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filteredResults.reverse());
  }, [users, search])

  const handleDelete=(name) =>{
    const usersList = users.filter(user => user.name !== name);
    setUsers(usersList);
  }
  return(

    <div>
    <h1>Users</h1>

    <div className="nav-search">
          <input 
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
        </div>


    <table className="table">
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
        {searchResults.map((user) => (
          <tr key={user}>
            <td>{user.name}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.authorizationLevel}</td>
            <td>  <button onClick={() => handleDelete(user.name)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link to="/AddUser"> <button>Add user</button> </Link>
  </div>
);
          
}


export default Users;