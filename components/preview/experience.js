"use client";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import parse from "html-react-parser";

export default function Experience({ resume }) {
  return (
    <div className="my-6">
      <h2
        className="font-bold text-sm mb-2"
        style={{ color: resume.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />

      {resume?.experience.map((exp, index) => {
        return (
          <div key={index} className="my-5">
            <h2 className="text-sm font-bold">{exp?.title}</h2>
            <h3 className="text-sm">{exp?.company}</h3>
            <p className="text-xs text-gray-600">{exp?.address}</p>
            <p className="text-xs text-gray-600">{exp?.startDate} - {exp?.endDate}</p>

            {/*exp?.summary && (
              <ReactQuill
                readOnly={true}
                value={exp.summary}
                theme="bubble"
                className="text-sm font-normal"
                style={{border:"2px solid red",padding:0,margin:0}}
              />
            )*/}

            {exp?.summary && (
              <div className="text-xs font-normal mt-1">{parse(exp?.summary)}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
