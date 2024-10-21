"use client";
import React from "react";
import {
  saveResumeToDb,
  getUserResumesFromDb,
  getResumeFromDb,
  updateResumeFromDb,
  updateExperienceToDb,
  updateEducationToDb,
  updateSkillsToDb,
  deleteResumeFromDb,
} from "@/actions/resume";
import toast from "react-hot-toast";
import { useRouter, useParams, usePathname } from "next/navigation";
import { runAi } from "@/actions/ai";

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
  // state
  const [resume, setResume] = React.useState(initialState);
  const [resumes, setResumes] = React.useState([]);
  const [step, setStep] = React.useState(1);
  // experience
  const [experienceList, setExperienceList] = React.useState([experienceField]);
  const [experienceLoading, setExperienceLoading] = React.useState({});
  // education
  const [educationList, setEducationList] = React.useState([educationField]);
  // skills
  const [skillsList, setSkillsList] = React.useState([skillField]);

  // hooks
  const router = useRouter();
  const { _id } = useParams();
  const pathname = usePathname();

  // React.useEffect(() => {
  //   if (pathname?.includes("/resume/create")) {
  //     setResume(initialState);
  //     setStep(1);
  //   }
  // }, [pathname]);

  React.useEffect(() => {
    const savedResume = localStorage.getItem("resume");
    if (savedResume) {
      setResume(JSON.parse(savedResume));
    }
  }, []);

  React.useEffect(() => {
    getUserResumes();
  }, []);

  React.useEffect(() => {
    if (_id) {
      getResume(_id);
    }
  }, [_id]);

  const saveResume = async () => {
    try {
      const data = await saveResumeToDb(resume);
      setResume(data);
      localStorage.removeItem("resume");
      toast.success("🎉 Resume saved. Keep building");
      router.push(`/dashboard/resume/edit/${data._id}`);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume");
    }
  };

  const getUserResumes = async () => {
    try {
      const data = await getUserResumesFromDb();
      setResumes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resumes");
    }
  };

  const getResume = async () => {
    try {
      const data = await getResumeFromDb(_id);
      setResume(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to get resume");
    }
  };

  const updateResume = async () => {
    try {
      const data = await updateResumeFromDb(resume);
      setResume(data);
      toast.success("🎉 Resume updated. Keep building!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update resume");
    }
  };

  // experience section
  const updateExperience = async (experienceList) => {
    try {
      const data = await updateExperienceToDb({
        ...resume,
        experience: experienceList,
      });
      setResume(data);
      toast.success("🎉 Experience updated. Keep building!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update experience");
    }
  };

  React.useEffect(() => {
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

  const handleExperienceSubmit = () => {
    updateExperience(experienceList);
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

  const removeExperience = () => {
    if (experienceList.length === 1) return;
    const newEntries = experienceList.slice(0, experienceList.length - 1);
    setExperienceList(newEntries);
    // update the db with updated experience array
    updateExperience(newEntries);
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
  React.useEffect(() => {
    if (resume.education) {
      setEducationList(resume.education);
    }
  }, [resume]);

  const updateEducation = async (educationList) => {
    try {
      const data = await updateEducationToDb({
        ...resume,
        education: educationList,
      });
      setResume(data);
      toast.success("🎉 Education updated. Keep building!");
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

  const handleEducationSubmit = () => {
    updateEducation(educationList);
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

  const removeEducation = () => {
    if (educationList.length === 1) return;
    const newEntries = educationList.slice(0, educationList.length - 1);
    setEducationList(newEntries);
    // update the db with updated education array
    updateEducation(newEntries);
  };

  // skills section
  React.useEffect(() => {
    if (resume.skills) {
      setSkillsList(resume.skills);
    }
  }, [resume]);

  const updateSkills = async (skillsList) => {
    // validate that each skill has both name and level
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
      });
      setResume(data);
      toast.success("🎉 Skills updated. Keep building!");
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

  const handleSkillsSubmit = () => {
    updateSkills(skillsList);
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

  const removeSkill = () => {
    if (skillsList.length === 1) return;
    const newEntries = skillsList.slice(0, skillsList.length - 1);
    setSkillsList(newEntries);
    // update the db with updated skills array
    updateSkills(newEntries);
  };

  const deleteResume = async (_id) => {
    try {
      await deleteResumeFromDb(_id);
      setResumes(resumes.filter((resume) => resume._id !== _id));
      toast.success("🎉 Resume deleted");
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
