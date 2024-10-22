"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useResume } from "@/context/resume";
import ResumeCard from "@/components/cards/resume-card";
import toast from "react-hot-toast";


export default function DownloadPage({ params }) {
  // context
  const { resumes } = useResume();
  // state
  const [currentResume, setCurrentResume] = React.useState(null);

  React.useEffect(() => {
    if (resumes && params?._id) {
      const resume = resumes.find((r) => r._id === params._id);
      setCurrentResume(resume);
    }
  }, [resumes, params._id]);

  const printResume = () => {
    if (typeof window !== "undefined") {
      const newWindow = window.open(`/resume/${currentResume._id}`, "_blank");

      newWindow.onload = () => {
        setTimeout(() => {
          newWindow.print();
        }, 300);
      };
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mx-5 my-20 overflow-auto">
      <div className="text-center w-full md:w-1/3">
        <h2 className="font-bold text-lg">
         Resume is ready!
        </h2>
        <p>You can now download, print or share.</p>

        <div className="flex justify-between my-20">
          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/1091/1091007.png"
              width={50}
              height={50}
            />
            <Button onClick={printResume} className="my-2">
              Download
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/839/839184.png"
              width={50}
              height={50}
            />
            <Button onClick={printResume} className="my-2">
              Print
            </Button>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/719/719731.png"
              width={50}
              height={50}
            />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/resume/${currentResume._id}`
                );
                toast.success(
                  "Link copied to clipboard to share with anyone, anywhere!"
                );
              }}
              className="my-2"
            >
              Share
            </Button>
          </div>
        </div>

        {currentResume ? (
          <ResumeCard resume={currentResume} print={true} />
        ) : null}
        <div className="mb-10"></div>
      </div>
    </div>
  );
}
