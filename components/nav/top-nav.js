"use client";
import { useAuth } from "@/context/authContext";
import { useResume } from "@/context/resume";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function TopNav() {
  const { isAuthenticated, handleLogout } = useAuth();
  const { resumes } = useResume();
  const router = useRouter();

  const navigateToResumes = () => {
    router.push("/dashboard");
  };

  const create = () => {
    router.push("/resume/create");
  };

  return (
    <nav
      className="flex justify-between items-center p-1 shadow top-nav"
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center p-1 ">
        <Link href="/">
          <Image src="/logo.png" alt="logo db" width={100} height={100} />
        </Link>
        <Link href="/" style={{ marginLeft: "20px" }}>
          <Image src="/next.png" alt="logo next.js" width={100} height={100} />
        </Link>
      </div>

      <Toaster />

      <div className="flex justify-end items-center gap-2">
        <button
          onClick={create}
          className="bg-black text-white py-1 px-5 rounded"
        >
          Create
        </button>

        {isAuthenticated && resumes.length >= 1 && (
          <button
            onClick={navigateToResumes}
            className="bg-black text-white py-1 px-5 rounded"
          >
            Resumes
          </button>
        )}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-1 px-5 rounded"
          >
            Logout
          </button>
        )}
        <a
          href="https://github.com/davidebalice/nextjs-resume-generator"
          target="_blank"
        >
          <img src="/github2.png" alt="logo github" width={100} height={100} />
        </a>
      </div>
    </nav>
  );
}
