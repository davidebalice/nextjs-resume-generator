"use client";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";
import { BsPersonVcardFill } from "react-icons/bs";

export default function Experience({ resume }) {
  return (
    <div className="my-6">
      <h2
        className="font-bold text-md mb-2 flex align-item-center gap-2"
        style={{ color: resume.themeColor }}
      >
        <BsPersonVcardFill style={{fontSize:"24px",color:"#222"}}/>
        Professional experience
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />

      {resume?.experience.map((exp, index) => {
        return (
          <div key={index} className="my-5">
            {exp?.startDate && (
              <p className="text-xs text-gray-600 dateExperience">
                {exp?.startDate}
                {exp?.endDate && " - " + exp?.endDate}
              </p>
            )}

            <h2 className="text-sm font-bold mb-1">{exp?.title}</h2>
            <h3 className="text-sm mb-1">{exp?.company}</h3>
            <p className="text-xs text-gray-600 mb-1">{exp?.address}</p>

            {exp?.summary && (
              <div className="text-xs font-normal mt-1">
                {parse(exp?.summary)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
