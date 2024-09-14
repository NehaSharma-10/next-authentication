"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const VerifyEmailPage = () => {
  const [token, setToken] = useState();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
        const response = await axios.post("/api/verifyemail", {
            token: token
            });

    } catch (error:any) {
        setError(true);
        console.log(error.response.data)
    }
  };
  return <div>Verifyemail</div>;
};

export default VerifyEmailPage;
