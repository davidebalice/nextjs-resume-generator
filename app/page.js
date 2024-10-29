"use client";
import Login from "@/components/login/login";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const { isAuthenticated, handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative text-gray-900">
      {isAuthenticated ? (
        <>
          <div
            className="relative bg-cover bg-center hero"
            style={{
              backgroundImage: "url('/bg.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

            <div className="relative z-10 flex items-center justify-center hero">
              <div className="text-center">
                <h1 className="text-white text-5xl font-bold mb-6">
                  Resume generator
                </h1>
                <p className="text-white mb-5 max-w-2xl mx-auto">
                  Insert your data, save, print and share Resume
                </p>
                <Link href="/resume/create">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4"
                    onClick={() => setLoading(true)}
                  >
                    {loading ? (
                      <>
                        <Image
                          src="/spinner-white.svg"
                          alt="spinner"
                          width={50}
                          height={50}
                          style={{ margin: "0 auto" }}
                        />
                      </>
                    ) : (
                      <>Start</>
                    )}

                    <ArrowRight className="ml-2" />
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
