"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const OnSignup = async (e:any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
      console.log("Signup Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pt-20">
      <h1 className="text-2xl text-center mb-10">{loading ? "Processing..." : "Sign up"}</h1>

      <form className="flex flex-col justify-center items-center" onSubmit={OnSignup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          autoComplete="true"
          className="p-3 border-2 border-[#dfdddd] outline-none"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="true"
          value={user.email}
      
          className="p-3 border-2 border-[#dfdddd] outline-none"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          autoComplete="true"
          className="p-3 border-2 border-[#dfdddd] outline-none"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <br />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded-md mb-3"
          disabled={buttonDisabled || loading}
        >
          {loading ? "Signing Up..." : "Sign up"}
        </button>
        <Link href="/login" className="text-purple-500">
          Visit Login
        </Link>
      </form>
    </div>
  );
};

export default SignupPage;
