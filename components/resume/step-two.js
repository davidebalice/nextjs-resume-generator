import { runAi } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import dynamic from "next/dynamic";
import React from "react";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();
  const [loading, setLoading] = React.useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume(token);
    setStep(3);
  };

  const handleGenerateWithAi = async () => {
    setLoading(true);
    if (!resume.job) {
      toast.error(
        "Please fill in your personal details or write something about yourself"
      );
      setLoading(false);
      return;
    }

    const response = await runAi(
      `Generate a resume summary for a person with the following details: ${JSON.stringify(
        resume
      )} in plain text format`
    );
    setResume({ ...resume, summary: response });
    setLoading(false);
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg bg-white">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">Summary</h2>
      </div>

      <ReactQuill
        theme="snow"
        onChange={(e) => setResume({ ...resume, summary: e })}
        value={resume.summary}
        className="custom-quill"
      />

      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
}
