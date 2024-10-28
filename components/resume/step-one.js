import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
import { HexColorPicker } from "react-colorful";

export default function StepOne() {
  const { resume, setResume, updateResume, setStep } = useResume();
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateResume(token);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResume((prevState) => {
      const updatedResume = { ...prevState, [name]: value };
      localStorage.setItem("resume", JSON.stringify(updatedResume));
      return updatedResume;
    });
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded bg-white">
      <h2 className="text-2xl font-bold mb-5">Personal information</h2>
      
      <label className="inputLabel mb-3">Name</label>
      <Input
        name="name"
        className="mb-3"
        onChange={handleChange}
        value={resume.name}
        placeholder="Your name"
        type="text"
        autoFocus
        required
      />

      <label className="inputLabel mb-3">Job title</label>
      <Input
        name="job"
        className="mb-3"
        onChange={handleChange}
        value={resume.job}
        placeholder="Job title"
        type="text"
        required
      />

      <label className="inputLabel mb-3">Address</label>
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        value={resume.address}
        placeholder="Address"
        type="text"
        required
      />

      <label className="inputLabel mb-3">Phone number</label> 
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resume.phone}
        placeholder="Phone number"
        type="number"
        required
      />

      <label className="inputLabel mb-3">Email</label>
      <Input
        name="email"
        className="mb-3"
        onChange={handleChange}
        value={resume.email}
        placeholder="Email"
        type="email"
        required
      />

      <HexColorPicker
        color={resume.themeColor}
        onChange={(themeColor) => setResume({ ...resume, themeColor })}
      />

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}
