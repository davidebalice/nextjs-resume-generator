import { runAi } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { Brain, Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import toast from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function StepTwo() {
  // context
  const { resume, setResume, updateResume, setStep } = useResume();
  // state
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume();
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
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">Summary</h2>

        <Button
          variant="destructive"
          onClick={handleGenerateWithAi}
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon size={18} className="mr-2 animate-spin" />
          ) : (
            <Brain size={18} className="mr-2" />
          )}
          Generate with AI
        </Button>
      </div>

      {/* <Textarea
        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        value={resume.summary}
        className="mb-3"
        placeholde="Write a summary about yourself"
        rows="10"
        required
      /> */}

      <ReactQuill
        theme="snow"
        onChange={(e) => setResume({ ...resume, summary: e })}
        value={resume.summary}
      />

      <div className="flex justify-end mt-3">
        <Button onClick={handleSubmit}>Next</Button>
      </div>
    </div>
  );
}
