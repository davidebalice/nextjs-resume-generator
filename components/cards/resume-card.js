"use client";
import Education from "@/components/preview/education";
import Experience from "@/components/preview/experience";
import PersonalDetails from "@/components/preview/personal-details";
import Skills from "@/components/preview/skills";
import Summary from "@/components/preview/summary";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { Download, Trash, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResumeCard({ resume }) {
  const { deleteResume } = useResume();
  const router = useRouter();
  const token = localStorage.getItem("token");

  return (
    <div
      className="relative shadow-lg w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-y-auto"
      style={{ borderColor: resume?.themeColor }}
    >
      <div className="line-clamp-3">
        <PersonalDetails resume={resume} />
      </div>
      <div className="line-clamp-4">
        <Summary resume={resume} />
      </div>

      <div className="line-clamp-4">
        <Experience resume={resume} />
      </div>

      <div className="line-clamp-4">
        <Education resume={resume} />
      </div>

      <div className="line-clamp-4">
        <Skills resume={resume} />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-4">
          <Button
            onClick={() => router.push(`/dashboard/resume/edit/${resume._id}`)}
          >
            <UserPen />
          </Button>
          <Button
            onClick={() =>
              router.push(`/dashboard/resume/download/${resume._id}`)
            }
          >
            <Download />
          </Button>
          <Button onClick={() => deleteResume(resume._id, token)}>
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
}
