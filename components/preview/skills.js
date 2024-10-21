import React from "react";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export default function Skills({ resume, print = false }) {
  const themeColor = resume?.themeColor || "#333";
  const defaultColor = "#d3d3d3";

  return (
    <div className="my-6">
      <h2 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resume?.skills.map((skill, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <h2 className="text-sm font-bold">{skill?.name}</h2>

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
                  <Progress value={skill.level * 20} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
