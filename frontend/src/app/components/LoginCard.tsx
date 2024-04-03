"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const Login = () => {
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="border border-gray-400 rounded-md py-1 px-2 mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};
