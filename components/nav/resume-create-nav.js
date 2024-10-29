import { Button } from "@/components/ui/button";
import { useResume } from "@/context/resume";
import { usePathname } from "next/navigation";

export default function ResumeCreateNav() {
  const { step, setStep, resetResume } = useResume();
  const pathname = usePathname();
  const isEditPage = pathname.includes("/edit/");

  return (
    <nav className="flex justify-center w-full py-4">
      <div className="flex space-x-4">
        <button
          onClick={() => resetResume()}
          className="bg-black text-white py-1 px-5 rounded"
        >
          Reset data
        </button>

        <p className="stepTitle">Step</p>
        {[1, 2, 3, 4, 5].map((item) => (
          <Button
            className={`w-10 h-10 flex items-center justify-center rounded-full transition hover:bg-primary hover:text-slate-200 ${
              step === item
                ? "bg-primary text-slate-200 dark:text-slate-800"
                : "bg-secondary text-gray-700 dark:text-gray-400"
            }`}
            key={item}
            onClick={() => setStep(item)}
            disabled={!isEditPage && step < item}
          >
            {item}
          </Button>
        ))}
      </div>
    </nav>
  );
}
