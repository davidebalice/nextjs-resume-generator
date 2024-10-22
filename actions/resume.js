"use server";
import db from "@/database/db";
import Resume from "@/models/resume";
import { currentUser } from "@/utils/auth";

const checkOwnership = async (resumeId, token) => {
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
  try {
    db();
    const user = await currentUser(token);

    const userEmail = user?.email;

    const { _id, ...rest } = data;

    const resume = await Resume.create({ ...rest, userEmail });
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserResumesFromDb = async (token) => {
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

export const getResumeFromDb = async (_id) => {
  try {
    db();
    const resume = await Resume.findById(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateResumeFromDb = async (data, token) => {
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

export const updateExperienceToDb = async (data, token) => {
  try {
    db();
    const { _id, experience } = data;

    await checkOwnership(_id, token);

    const resume = await Resume.findByIdAndUpdate(
      _id,
      { experience },
      { new: true }
    );
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const updateEducationToDb = async (data, token) => {
  try {
    db();
    const { _id, education } = data;

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

export const updateSkillsToDb = async (data, token) => {
  try {
    db();
    const { _id, skills } = data;

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
  try {
    db();
    await checkOwnership(_id, token);

    const resume = await Resume.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};
