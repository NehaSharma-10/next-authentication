"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Profile = () => {
  const router = useRouter();

  const [data, setData] = useState('nothing');

  const logout = async () => {
    try {
      // Call the logout API
      await axios.get("/api/users/logout");
      
      // Show a success message
      toast.success("Logged out successfully");

      // Redirect the user to the login page
      router.push("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      
      // Show an error message if something goes wrong
      toast.error("Logout unsuccessful");
    }
  };
  const getUserDetails = async () => {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
      console.log(res.data);
  }

  return (
    <div className="pt-5 flex flex-col justify-center items-center">
      <h1>Profile</h1>
      <p>This is a profile page.</p>

      <h1>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</h1>
      <button 
        onClick={logout} 
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>

      <button onClick={getUserDetails} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors ">
        Get User Details
      </button>
    </div>
  );
};

export default Profile;
