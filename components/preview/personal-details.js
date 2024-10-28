import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function PersonalDetails({ resume }) {
  return (
    <>
      <h2
        className="font-bold text-xl text-center"
        style={{ color: resume.themeColor }}
      >
        {resume.name}
      </h2>
      <h2 className="text-center text-sm font-medium">{resume.job}</h2>
      <h2 className="text-center text-sm font-medium">{resume.address}</h2>

      <div className="flex justify-between">
        <h2 className="font-normal text-sm flex align-item-center gap-2">
          <FaPhoneSquareAlt style={{ fontSize: "19px" }} />
          {resume.phone}
        </h2>
        <h2 className="font-normal text-sm flex align-item-center gap-2">
          <IoMdMail style={{ fontSize: "21px" }} />
          {resume.email}
        </h2>
      </div>

      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: resume.themeColor }}
      />
    </>
  );
}
