import parse from "html-react-parser";
import { IoPersonCircle } from "react-icons/io5";

export default function Summary({ resume }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold mb-3 flex align-item-center gap-1" style={{ color: resume.themeColor }}>
        <IoPersonCircle style={{fontSize:"26px",color:"#222"}} />
        Summary
      </h2>
      {resume.summary && (
        <div className="text-xs font-normal">{parse(resume.summary)}</div>
      )}
    </div>
  );
}
