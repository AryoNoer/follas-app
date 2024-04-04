"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const Login = () => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiUrl}/users`, loginData);
      console.log("User logged in:", response.data);
      // Reset form after successful login
      setLoginData({ email: "", password: "" });
      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-full focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-full focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none"
        >
          Login
        </button>
        <p className="text-center mt-4">Don't have an account? <a href="/welcome/register" className="text-blue-500 hover:text-blue-700 font-bold">Register</a></p>
      </form>
    </div>
  );
};
