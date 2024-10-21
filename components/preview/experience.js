"use client";
import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

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

            {exp?.summary && (
              <ReactQuill
                readOnly={true}
                value={exp.summary}
                theme="bubble"
                className="text-sm font-nromal"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
