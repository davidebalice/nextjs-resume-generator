import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import { ArrowRight, Plus, X } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function StepThree() {
  const token = localStorage.getItem("token");
  const {
    experienceList,
    handleExperienceChange,
    handleExperienceQuillChange,
    handleExperienceSubmit,
    addExperience,
    removeExperience,
    handleExperienceGenerateWithAi,
    experienceLoading,
  } = useResume();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto bg-white">
      <h2 className="text-2xl font-bold mb-5">Experiences</h2>

      {experienceList?.length > 0 &&
        experienceList?.map((experience, index) => (
          <div key={index} className="mb-10">
            <Input
              name="title"
              type="text"
              placeholder="Job title"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.title}
              className="mb-3"
              autoFocus
            />

            <Input
              name="company"
              type="text"
              placeholder="Company name"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.company}
              className="mb-3"
            />

            <Input
              name="address"
              type="text"
              placeholder="Company address"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.address}
              className="mb-3"
            />

            <Input
              name="startDate"
              type="text"
              placeholder="Start date"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.startDate}
              className="mb-3"
            />

            <Input
              name="endDate"
              type="text"
              placeholder="End date"
              onChange={(e) => handleExperienceChange(e, index)}
              value={experience.endDate}
              className="mb-3"
            />

            <ReactQuill
              theme="snow"
              onChange={(value) => handleExperienceQuillChange(value, index)}
              value={experience.summary}
              className="mb-2 custom-quill2"
              placeholder="Job summary"
            />
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant="outline" onClick={addExperience}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {experienceList?.length > 1 && (
          <Button variant="outline" onClick={() => removeExperience(token)}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}

        <Button variant="outline" onClick={() => handleExperienceSubmit(token)}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
