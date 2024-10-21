"use server";
import db from "@/database/db";
import Resume from "@/models/resume";

const checkOwnership = async (resumeId) => {
  try {
    // get current user
    //const user = await currentUser();
    const user = null;
    const userEmail = user?.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      throw new Error("User not found");
    }

    // find the resume by id
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      throw new Error("Resume not found");
    }

    // check if the resume belongs to the user
    if (resume.userEmail !== userEmail) {
      throw new Error("Unauthorized");
    }

    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const saveResumeToDb = async (data) => {
  try {
    db();
    //const user = await currentUser();
    const user = null;
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const { _id, ...rest } = data;

    const resume = await Resume.create({ ...rest, userEmail });
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};

export const getUserResumesFromDb = async () => {
  try {
    db();
    //const user = await currentUser();
    const user = null;
    const userEmail = user?.emailAddresses[0]?.emailAddress;

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

export const updateResumeFromDb = async (data) => {
  try {
    db();
    const { _id, ...rest } = data;

    // check ownership
    await checkOwnership(_id);

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
    const { _id, experience } = data;

    // check ownership
    await checkOwnership(_id);

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

export const updateEducationToDb = async (data) => {
  try {
    db();
    const { _id, education } = data;

    // check ownership
    await checkOwnership(_id);

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
    const { _id, skills } = data;

    // check ownership
    await checkOwnership(_id);

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

export const deleteResumeFromDb = async (_id) => {
  try {
    db();
    // check ownership
    await checkOwnership(_id);

    const resume = await Resume.findByIdAndDelete(_id);
    return JSON.parse(JSON.stringify(resume));
  } catch (err) {
    throw new Error(err);
  }
};
