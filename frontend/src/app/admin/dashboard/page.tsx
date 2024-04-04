"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/app/components/Button";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default function DashboardAdmin() {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: '', email: '', password: '' });
  const [updateUser, setUpdateUser] = useState<User>({ id: 0, name: '', email: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${ApiUrl}/api/user`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create user
  const createUser = async () => {
    try {
      const response = await axios.post<User>(`${ApiUrl}/api/user`, newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Update user
  const updateUserDetails = async () => {
    try {
      const response = await axios.put<User>(`${ApiUrl}/api/user/${updateUser.id}`, updateUser);
      setUsers(users.map((user) => (user.id === response.data.id ? response.data : user)));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${ApiUrl}/api/user/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Button text="Add Menu" className="border-black border-2" onClick={() => window.location.href = "/admin/addMenu"} />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <div>{`ID: ${user.id}`}</div>
              <div>{`Name: ${user.name}`}</div>
              <div>{`Email: ${user.email}`}</div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setUpdateUser(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <button
          onClick={createUser}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Update User</h2>
        <input
          type="text"
          placeholder="Name"
          value={updateUser.name}
          onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={updateUser.email}
          onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={updateUser.password}
          onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <button
          onClick={updateUserDetails}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update User
        </button>
      </div>
    </main>
  );
}
