import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResume } from "@/context/resume";
//import { useUser, SignInButton } from "@clerk/nextjs";

export default function StepOneCreate() {
  // context
  const { resume, setResume, saveResume } = useResume();
  // hooks
  //const { isSignedIn } = useUser();
  const isSignedIn  = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    saveResume();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // update the resume state
    setResume((prevState) => {
      const updatedResume = { ...prevState, [name]: value };
      // save the updated resume to local storage
      localStorage.setItem("resume", JSON.stringify(updatedResume));
      return updatedResume;
    });
  };

  return (
    <div className="w-full p-5 shadow-lg border-t-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Personal Information</h2>

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
      <Input
        name="job"
        className="mb-3"
        onChange={handleChange}
        value={resume.job}
        placeholder="Job title"
        type="text"
        required
      />
      <Input
        name="address"
        className="mb-3"
        onChange={handleChange}
        value={resume.address}
        placeholder="Address"
        type="text"
        required
      />
      <Input
        name="phone"
        className="mb-3"
        onChange={handleChange}
        value={resume.phone}
        placeholder="Phone number"
        type="number"
        required
      />
      <Input
        name="email"
        className="mb-3"
        onChange={handleChange}
        value={resume.email}
        placeholder="Email"
        type="email"
        required
      />

      <div className="flex justify-end">
        {!isSignedIn ? (
            <Button>Sign in to save</Button>
        ) : (
          <Button onClick={handleSubmit}>Save</Button>
        )}
      </div>
    </div>
  );
}
