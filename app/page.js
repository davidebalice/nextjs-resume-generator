"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Download,
  Printer,
  Share2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token); // Salva il token
      alert("Login successful!");
    } else {
      alert(data.message);
    }
  };

  const handleRegister = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("User registered successfully!");
    } else {
      alert(data.message);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>

      <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Background Image */}
        <div
          className="relative bg-cover bg-center"
          style={{
            backgroundImage: 'url("/bg.jpg")',
            height: "50vh",
          }}
        >
          {/* Optional: Add an overlay to darken the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <h1 className="text-white text-5xl font-bold mb-6">
                Create Your Perfect Resume with AI
              </h1>
              <p className="text-white mb-5 max-w-2xl mx-auto">
                Our AI-powered resume builder helps you craft professional,
                eye-catching resumes in seconds. It's free to use and incredibly
                easy. Stand out from the crowd and land your dream job!
              </p>
              <Link href="/resume/create">
                <Button size="lg" className="text-lg px-8 py-4">
                  Get Started for Free <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="bg-white dark:bg-gray-800 pt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-20">
              Why Choose Our Free AI Resume Builder?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Sparkles className="w-12 h-12 text-blue-500" />}
                title="AI-Powered Content"
                description="Our AI generates tailored content based on your experience and the job you're applying for, making it very easy to use."
              />
              <FeatureCard
                icon={<CheckCircle className="w-12 h-12 text-green-500" />}
                title="Create Unlimited Resumes"
                description="Build as many resumes as you need, completely free. Perfect for applying to multiple jobs or industries."
              />
              <FeatureCard
                icon={<ArrowRight className="w-12 h-12 text-purple-500" />}
                title="Easy Customization"
                description="Easily customize your resume with our intuitive interface. It's so simple, anyone can create a professional resume in minutes."
              />
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 mt-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Download, Print, or Share Your Resume in Minutes
            </h2>
            <div className="flex justify-center space-x-8 mb-8">
              <div className="flex flex-col items-center">
                <Download className="w-12 h-12 mb-2" />
                <span>Download</span>
              </div>
              <div className="flex flex-col items-center">
                <Printer className="w-12 h-12 mb-2" />
                <span>Print</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="w-12 h-12 mb-2" />
                <span>Share</span>
              </div>
            </div>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their
              dream jobs using our free, easy-to-use AI-powered resume builder.
              Create unlimited resumes and choose how to use them!
            </p>
            <Link href="/resume/create">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                Create Your Free Resume Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
}
