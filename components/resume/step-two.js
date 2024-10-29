import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function StepTwo() {
  const { resume, setResume, updateResume, setStep } = useResume();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    updateResume(token);
    setStep(3);
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded bg-white">
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
        <Button onClick={handleSubmit}>
          {" "}
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
            <>Next</>
          )}
        </Button>
      </div>
    </div>
  );
}
