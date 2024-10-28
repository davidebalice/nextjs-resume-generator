import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import { ArrowRight, Plus, X } from "lucide-react";

export default function SetpFour() {
  const token = localStorage.getItem("token");
  const {
    educationList,
    handleEducationChange,
    handleEducationSubmit,
    addEducation,
    removeEducation,
  } = useResume();

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded overflow-y-auto bg-white">
      <h2 className="text-2xl font-bold mb-5">Education</h2>

      {educationList?.length > 0 &&
        educationList?.map((education, index) => (
          <div key={index} className="mb-10">
            <label className="inputLabel mb-3">
              School / University / Institute
            </label>
            <Input
              name="name"
              type="text"
              placeholder="School / University / Institute"
              value={education.name}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
              autoFocus
            />

            <label className="inputLabel mb-3">Address</label>
            <Input
              name="address"
              type="text"
              placeholder="Address"
              value={education.address}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />

            <label className="inputLabel mb-3">Qualification</label>
            <Input
              name="qualification"
              type="text"
              placeholder="Qualification"
              value={education.qualification}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />

            <label className="inputLabel mb-3">Year</label>
            <Input
              name="year"
              type="text"
              placeholder="Year"
              value={education.year}
              onChange={(e) => handleEducationChange(e, index)}
              className="mb-3"
            />
          </div>
        ))}

      <div className="flex justify-between mt-3">
        <Button variant="outline" onClick={addEducation}>
          <Plus size={18} className="mr-2" /> Add
        </Button>

        {educationList?.length > 1 && (
          <Button variant="outline" onClick={removeEducation}>
            <X size={18} className="mr-2" /> Remove
          </Button>
        )}

        <Button variant="outline" onClick={() => handleEducationSubmit(token)}>
          <ArrowRight size={18} className="mr-2" /> Next
        </Button>
      </div>
    </div>
  );
}
