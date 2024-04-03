"use client";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/user";
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(ApiUrl, userData);
      console.log("User registered:", response.data);
      // Reset form after successful registration
      setUserData({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

