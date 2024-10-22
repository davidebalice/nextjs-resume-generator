"use client";

import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("mario@rossi.it");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      onLogin();
    } else {
      //alert(data.message);
    }
  };

  return (
    <div className="absolute top-5 right-5 bg-white shadow-lg p-5 rounded">
      <h1 className="text-lg font-bold">Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border rounded p-2 my-2 w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border rounded p-2 my-2 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full"
      >
        Login
      </button>
    </div>
  );
}
