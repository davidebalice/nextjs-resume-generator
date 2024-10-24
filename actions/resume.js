"use server";
import db from "@/database/db";
import Resume from "@/models/resume";
import { currentUser } from "@/utils/auth";

const checkOwnership = async (resumeId, token) => {
  if (!token) {
    console.log("token not found: checkOwnership");
  }
  try {
    const user = await currentUser(token);
    const userEmail = user?.email;
    if (!userEmail) {
      throw new Error("User not found");
    }

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      throw new Error("Resume not found");
    }

    if (resume.userEmail !== userEmail) {
      throw new Error("Unauthorized");
    }

    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const saveResumeToDb = async (data, token) => {
  if (!token) {
    console.log("token not found: saveResumeToDb");
  }
  try {
    db();
    const user = await currentUser(token);
    //console.log(user);
    const userEmail = user?.email;
    //console.log(userEmail);
    const { _id, ...rest } = data;

    const resume = await Resume.create({ ...rest, userEmail });
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserResumesFromDb = async (token) => {
  if (!token) {
    console.log("token not found: getUserResumesFromDb");
  }
  try {
    db();
    const user = await currentUser(token);

    const userEmail = user?.email;

    const resumes = await Resume.find({ userEmail });
    return JSON.parse(JSON.stringify(resumes));
  } catch (err) {
    throw new Error(err);
  }
};

export const getResumeFromDb = async (_id, token) => {
  if (!token) {
    console.log("token not found: getResumeFromDb");
  }
  try {
    db();
    const resume = await Resume.findById(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateResumeFromDb = async (data, token) => {
  if (!token) {
    console.log("token not found: updateResumeFromDb");
  }
  try {
    db();
    const { _id, ...rest } = data;

    await checkOwnership(_id, token);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { ...rest },
      { new: true }
    );

    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateExperienceToDb = async (data) => {
  try {
    db();
    const { _id, experience, token } = data;

    await checkOwnership(_id, token);
    if (!token) {
      console.log("token not found: updateExperienceToDb");
    }

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { experience },
      { new: true },
      token
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateEducationToDb = async (data) => {
  try {
    db();
    const { _id, education, token } = data;
    if (!token) {
      console.log("token not found: updateEducationToDb");
    }

    await checkOwnership(_id, token);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { education },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateSkillsToDb = async (data) => {
  try {
    db();
    const { _id, skills, token } = data;
    if (!token) {
      console.log("token not found: updateSkillsToDb");
    }
    await checkOwnership(_id, token);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { skills },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteResumeFromDb = async (_id, token) => {
  if (!token) {
    console.log("token not found: deleteResumeFromDb");
  }
  try {
    db();
    await checkOwnership(_id, token);

    const resume = await Resume.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};
