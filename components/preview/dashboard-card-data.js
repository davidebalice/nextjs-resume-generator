export default function DashboardCardData({ resume }) {
  return (
    <>
      <h2
        className="font-bold text-l text-center"
        style={{ color: resume.themeColor }}
      >
        {resume.name}
      </h2>
      <h2 className="text-center text-sm font-medium">{resume.job}</h2>
      <h2 className="text-center text-sm font-medium">{resume.address}</h2>

      <div className="flex justify-between mt-5">
        <h2 className="font-normal text-xs">{resume.phone}</h2>
        <h2 className="font-normal text-xs">{resume.email}</h2>
      </div>
    </>
  );
}
