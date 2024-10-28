import { IoMdSchool } from "react-icons/io";

export default function Education({ resume }) {
  return (
    <div className="my-6">
      <h2
        className="font-bold text-md mb-2 flex gap-2 align-items-center"
        style={{ color: resume.themeColor }}
      >
        <IoMdSchool style={{fontSize:"22px", color:"#222"}} />
        
        Education
      </h2>
      <hr style={{ borderColor: resume.themeColor }} />

      {resume.education.map((edu, index) => {
        return (
          <div key={index} className="my-5">
            <h3 className="font-bold text-sm  mb-1">{edu.qualification}</h3>
            <p className="text-sm  mb-1">{edu.name}</p>
            <p className="text-xs text-gray-600  mb-1">{edu.address}</p>
            <p className="text-xs text-gray-600  mb-1">{edu.year}</p>
          </div>
        );
      })}
    </div>
  );
}
