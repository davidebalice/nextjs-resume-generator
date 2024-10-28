import React from "react";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import { FaCode } from "react-icons/fa6";

export default function Skills({ resume, print = false }) {
  const themeColor = resume?.themeColor || "#333";
  const defaultColor = "#d3d3d3";

  return (
    <div className="my-6">
      <h2 className="font-bold text-sm mb-2 flex gap-2 align-items-center" style={{ color: themeColor }}>
        <FaCode style={{fontSize:"22px",color:"#222"}}/>
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className="my-4">
        {resume?.skills.map((skill, index) => {
          return (
            <div key={index} className="flex items-center justify-between mb-3">
              <h2 className="text-sm skillContainer">{skill?.name}</h2>

              <div className="flex-1 ml-2">
                {print ? (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5"
                        style={{
                          color: i < skill.level ? themeColor : defaultColor,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Progress value={skill.level * 20} className="progressBar"/>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
