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
    <div className="relative text-gray-900">
      <div
        className="relative bg-cover bg-center hero"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

        <div className="flex justify-center items-center hero">
          <div className="relative bg-white shadow-lg p-5 rounded z-10">
            <h1 className="text-lg font-bold text-center">Resume generator</h1>
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
              className="bg-black text-white py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
