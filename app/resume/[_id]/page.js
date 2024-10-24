import { getResumeFromDb } from "@/actions/resume";
import Education from "@/components/preview/education";
import Experience from "@/components/preview/experience";
import PersonalDetails from "@/components/preview/personal-details";
import Skills from "@/components/preview/skills";
import Summary from "@/components/preview/summary";

export async function generateMetadata({ params }) {
  const resume = await getResumeFromDb(params._id);

  return {
    title: `${resume.name} - Resume`,
    description: resume.summary,
    openGraph: {
      title: `${resume.name} - Resume`,
      description: resume.summary,
      images: ["/logo.png"],
    },
  };
}

export default async function ResumePage({ params }) {
  const resume = await getResumeFromDb(params._id);


  return (
    <div className="m-20">
      <PersonalDetails resume={resume} />
      <Summary resume={resume} />
      <Experience resume={resume} />
      <Education resume={resume} />
      <Skills resume={resume} print={true} />
    </div>
  );
}
