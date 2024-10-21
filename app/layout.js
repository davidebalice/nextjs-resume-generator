import TopNav from "@/components/nav/top-nav";
import { ResumeProvider } from "@/context/resume";
import { ThemeProvider } from "@/context/theme";
import { Inter } from "next/font/google";
import "./globals.css";
//import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Resume Builder",
  description:
    "Free AI powered resume builder to build a professional resume in minutes. Download print or share for free with anyone in the world!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ResumeProvider>
            <TopNav />
            {children}
          </ResumeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
