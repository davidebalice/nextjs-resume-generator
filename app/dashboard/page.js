"use client";
import ResumeCard from "@/components/cards/resume-card";
import SkeletonCard from "@/components/cards/skeleton-card";
import { useAuth } from "@/context/authContext";
import { useResume } from "@/context/resume";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { resumes } = useResume();
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoadingAuth) {
      setIsLoading(false);
    } else {
      if (!isAuthenticated) {
        router.push("/");
      }
    }
  }, [isAuthenticated, isLoadingAuth, router]);

  if (!resumes?.length && !isLoading) {
    return (
      <div>
        <p className="text-center my-5">Loading...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5">
      {resumes?.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </div>
  );
}
