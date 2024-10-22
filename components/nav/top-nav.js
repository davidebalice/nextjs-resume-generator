"use client";
import { ModeToggle } from "@/components/nav/mode-toggle";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-1 shadow top-nav">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
      </Link>

      <Toaster />

      <div className="flex justify-end items-center gap-2">
        <ModeToggle />
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-3 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
