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
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none"
        >
          Register
        </button>
        <p className="text-center mt-4">Already have an account? <a href="/welcome/login" className="text-blue-500 hover:text-blue-700">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
