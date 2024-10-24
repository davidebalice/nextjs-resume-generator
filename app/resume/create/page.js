"use client";
import PreviewCard from "@/components/cards/preview-card";
import ResumeCreateNav from "@/components/nav/resume-create-nav";
import StepFive from "@/components/resume/step-five";
import StepFour from "@/components/resume/step-four";
import StepOneCreate from "@/components/resume/step-one-create";
import StepThree from "@/components/resume/step-three";
import StepTwo from "@/components/resume/step-two";
import { useAuth } from "@/context/authContext";
import { useResume } from "@/context/resume";
import { useRouter } from "next/navigation";

export default function ResumeCreatePage() {
  const { step } = useResume();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-y-auto resumePage">
        <>
          <div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-start lg:items-center">
            <p className="resumeText">Resume preview</p>
            <PreviewCard />
          </div>
          <div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:justify-start lg:items-start">
            <ResumeCreateNav />
            {step === 1 && <StepOneCreate />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
            {step === 4 && <StepFour />}
            {step === 5 && <StepFive />}
          </div>
        </>
    </div>
  );
}
