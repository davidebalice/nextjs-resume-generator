"use client";

import {
  deleteResumeFromDb,
  getResumeFromDb,
  getUserResumesFromDb,
  saveResumeToDb,
  updateEducationToDb,
  updateExperienceToDb,
  updateResumeFromDb,
  updateSkillsToDb,
} from "@/controller/resume";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ResumeContext = React.createContext();

const experienceField = {
  title: "",
  company: "",
  address: "",
  startDate: "",
  endDate: "",
  summary: "",
};

const educationField = {
  name: "",
  address: "",
  qualification: "",
  year: "",
};

const skillField = {
  name: "",
  level: "",
};

const initialState = {
  name: "",
  job: "",
  address: "",
  phone: "",
  email: "",
  themeColor: "",
  experience: [experienceField],
  education: [educationField],
  skills: [skillField],
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(initialState);
  const [resumes, setResumes] = useState([]);
  const [step, setStep] = useState(1);
  const [experienceList, setExperienceList] = useState([experienceField]);
  const [experienceLoading, setExperienceLoading] = useState({});
  const [educationList, setEducationList] = useState([educationField]);
  const [skillsList, setSkillsList] = useState([skillField]);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { _id } = useParams();

  console.log("token in context: " + token);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  useEffect(() => {
    getUserResumes(token);
  }, [token]);

  useEffect(() => {
    if (_id) {
      getResume(_id, token);
    }
  }, [_id, token]);

  const saveResume = async (token) => {
    try {
      const data = await saveResumeToDb(resume, token);
      setResume(data);
      localStorage.removeItem("resume");
      toast.success("Resume saved.");
      router.push(`/dashboard/resume/edit/${data._id}`);
      getUserResumes(token);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  };

  const getUserResumes = async (token) => {
    try {
      const data = await getUserResumesFromDb(token);
      setResumes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resumes");
    }
  };

  const getResume = async (token) => {
    try {
      const data = await getResumeFromDb(_id, token);
      setResume(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resume");
    }
  };

  const updateResume = async (token) => {
    try {
      const data = await updateResumeFromDb(resume, token);
      setResume(data);
      getUserResumes(token);
      toast.success("Resume updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  };

  const updateExperience = async (experienceList, token) => {
    try {
      const data = await updateExperienceToDb({
        ...resume,
        experience: experienceList,
        token,
      });
      setResume(data);
      getUserResumes(token);
      toast.success("Experience updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update experience");
    }
  };

  useEffect(() => {
    if (resume.experience) {
      setExperienceList(resume.experience);
    }
  }, [resume]);

  const handleExperienceChange = (e, index) => {
    const newEntries = [...experienceList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const handleExperienceQuillChange = (value, index) => {
    const newEntries = [...experienceList];
    newEntries[index].summary = value;
    setExperienceList(newEntries);
  };

  const handleExperienceSubmit = (token) => {
    updateExperience(experienceList, token);
    setStep(4);
  };

  const addExperience = () => {
    const newExperience = { ...experienceField };
    setExperienceList([...experienceList, newExperience]);
    setResume((prevState) => ({
      ...prevState,
      experience: [...experienceList, newExperience],
    }));
  };

  const removeExperience = (token) => {
    if (experienceList.length === 1) return;
    const newEntries = experienceList.slice(0, experienceList.length - 1);
    setExperienceList(newEntries);
    updateExperience(newEntries, token);
  };

  const handleExperienceGenerateWithAi = async (index) => {
    setExperienceLoading((prevState) => ({ ...prevState, [index]: true }));

    const selectedExperience = experienceList[index];
    if (!selectedExperience || !selectedExperience.title) {
      toast.error(
        "Please fill in the job details for the selected experience entry"
      );
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
      return;
    }

    const jobTitle = selectedExperience.title;
    const jobSummary = selectedExperience.summary || "";

    try {
      const response = await runAi(
        `Generate a list of duties and responsibilities in HTML bullet points for the job title "${jobTitle}" ${jobSummary}, not in markdown format.`
      );

      const updatedExperienceList = experienceList.slice();
      updatedExperienceList[index] = {
        ...selectedExperience,
        summary: response,
      };

      setExperienceList(updatedExperienceList);
      setResume((prevState) => ({
        ...prevState,
        experience: updatedExperienceList,
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate job description");
    } finally {
      setExperienceLoading((prevState) => ({ ...prevState, [index]: false }));
    }
  };

  // education section
  useEffect(() => {
    if (resume.education) {
      setEducationList(resume.education);
    }
  }, [resume]);

  const updateEducation = async (educationList, token) => {
    try {
      const data = await updateEducationToDb({
        ...resume,
        education: educationList,
        token,
      });
      setResume(data);
      toast.success("Education updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update education");
    }
  };

  const handleEducationChange = (e, index) => {
    const newEntries = [...educationList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const handleEducationSubmit = (token) => {
    updateEducation(educationList, token);
    setStep(5);
  };

  const addEducation = () => {
    const newEducation = { ...educationField };
    setEducationList([...educationList, newEducation]);
    setResume((prevState) => ({
      ...prevState,
      education: [...educationList, newEducation],
    }));
  };

  const removeEducation = (token) => {
    if (educationList.length === 1) return;
    const newEntries = educationList.slice(0, educationList.length - 1);
    setEducationList(newEntries);
    updateEducation(newEntries, token);
  };

  // skills section
  useEffect(() => {
    if (resume.skills) {
      setSkillsList(resume.skills);
    }
  }, [resume]);

  const updateSkills = async (skillsList, token) => {
    const invalidSkills = skillsList.filter(
      (skill) => !skill.name || !skill.level
    );

    if (invalidSkills.length > 0) {
      toast.error("Please fill in both skill name and level");
      return;
    }

    try {
      const data = await updateSkillsToDb({
        ...resume,
        skills: skillsList,
        token,
      });
      setResume(data);
      toast.success("Skills updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update skills");
    }
  };

  const handleSkillsChange = (e, index) => {
    const newEntries = [...skillsList];
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const handleSkillsSubmit = (token) => {
    updateSkills(skillsList, token);
    router.push(`/dashboard/resume/download/${resume._id}`);
  };

  const addSkill = () => {
    const newSkill = { ...skillField };
    setSkillsList([...skillsList, newSkill]);
    setResume((prevState) => ({
      ...prevState,
      skills: [...skillsList, newSkill],
    }));
  };

  const removeSkill = (token) => {
    if (skillsList.length === 1) return;
    const newEntries = skillsList.slice(0, skillsList.length - 1);
    setSkillsList(newEntries);
    updateSkills(newEntries, token);
  };

  const deleteResume = async (_id, token) => {
    try {
      await deleteResumeFromDb(_id, token);
      setResumes(resumes.filter((resume) => resume._id !== _id));
      getUserResumes(token);
      toast.success("Resume deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resume");
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        step,
        setStep,
        resume,
        setResume,
        saveResume,
        resumes,
        updateResume,
        experienceList,
        experienceLoading,
        handleExperienceChange,
        handleExperienceQuillChange,
        handleExperienceSubmit,
        addExperience,
        removeExperience,
        handleExperienceGenerateWithAi,
        educationList,
        handleEducationChange,
        handleEducationSubmit,
        addEducation,
        removeEducation,
        skillsList,
        handleSkillsChange,
        handleSkillsSubmit,
        addSkill,
        removeSkill,
        deleteResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => React.useContext(ResumeContext);
