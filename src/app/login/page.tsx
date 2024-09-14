"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const OnLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user); // Correctly send a POST request
      console.log(response.data);
      toast.success("Login Successful!");
      router.push("/profile");
    } catch (error: any) {
      console.error(error);
      toast.error("Login Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-20">
      <h1 className="text-2xl text-center mb-10">Login Page</h1>

      <form
        className="flex flex-col justify-center items-center"
        onSubmit={OnLogin} // Handle form submission with the OnLogin function
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          autoComplete="true"
          className="p-3 border-2 border-[#dfdddd] outline-none"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="true"
          value={user.password}
          className="p-3 border-2 border-[#dfdddd] outline-none"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded-md mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link href="/signup" className="text-pink-400">
          Visit Signup Page
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
