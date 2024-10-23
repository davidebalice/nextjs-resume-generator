"use client";
import { useAuth } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <nav
      className="flex justify-between items-center p-1 shadow top-nav"
      style={{ zIndex: 10 }}
    >
      <Link href="/">
        <Image src="/logo.png" alt="logo db" width={100} height={100} />
      </Link>

      <Toaster />

      <div className="flex justify-end items-center gap-2">
        <a
          href="https://github.com/davidebalice/nextjs-resume-generator"
          target="_blank"
        >
          <img src="/github2.png" alt="logo github" width={100} height={100} />
        </a>
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
