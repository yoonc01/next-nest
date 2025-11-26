"use client";
import { useState, useEffect } from "react";
import { searchUsers } from "../actions/user-actions";

export default function UsersPage() {
  const [users, setUsers] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    searchUsers("hyoyoon").then(data => setUsers(data));
  }, []);

  return (
    <main>
      <h1>Users</h1>
      {users.map(user => (
        <p key={user.id}>{user.name}</p>
      ))}
    </main>
  );
}
