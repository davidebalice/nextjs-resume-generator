"use client";
import Login from "@/components/login/login";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { isAuthenticated, handleLogin } = useAuth();

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {isAuthenticated ? (
        <>
          <div
            className="relative bg-cover bg-center hero"
            style={{
              backgroundImage: "url('/bg.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-6">
                  Resume generator
                </h1>
                <p className="text-white mb-5 max-w-2xl mx-auto">
                  Insert your data, save, and print Resume
                </p>
                <Link href="/resume/create">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Start <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
