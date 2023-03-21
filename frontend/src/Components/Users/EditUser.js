 import React, { useState } from "react";
 import { useParams,Link } from 'react-router-dom';

 const EditUser = ({ users, setUsers }) => {

    const {name} = useParams();

    const user = users.find(user => (user.name) === name);
    return(
        <div>{user.name}</div>
    )
//   const [name, setName] = useState(users.name);
//   const [lastName, setLastName] = useState(users.lastName);
//   const [email, setEmail] = useState(users.email);
//   const [authorizationLevel, setAuthorizationLevel] = useState(users.authorizationLevel);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const updatedUser = { ...users, name, lastName, email, authorizationLevel };
//     setUsers(updatedUser);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Edit User</h1>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="last-name">Last Name:</label>
//         <input
//           type="text"
//           id="last-name"
//           value={lastName}
//           onChange={(event) => setLastName(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="authorization-level">Authorization Level:</label>
//         <input
//           type="text"
//           id="authorization-level"
//           value={authorizationLevel}
//           onChange={(event) => setAuthorizationLevel(event.target.value)}
//         />
//       </div>
//       <button type="submit">Save Changes</button>
//     </form>
//   );
 };

 export default EditUser;
