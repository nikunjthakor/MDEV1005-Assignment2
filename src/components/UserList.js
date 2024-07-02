import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

function UserList() {
  // State to store the users and loading state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from Firestore on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'Users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => doc.data());
      setUsers(userList);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Render loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the list of users in a table
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registered Users</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
