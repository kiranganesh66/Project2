import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000"); // Replace with your server address

    socket.on("users", (users) => {
      setUsers(users);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="user-list">
      <h2>Users Online</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
