import Footer from "@/components/nav/footer";
import TopNav from "@/components/nav/top-nav";
import { AuthProvider } from "@/context/authContext";
import { ResumeProvider } from "@/context/resume";
import { ThemeProvider } from "@/context/theme";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js - Resume generator",
  description: "Generate and download your resume.",
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
          <AuthProvider>
            <ResumeProvider>
              <TopNav />
              {children}
              <Footer />
            </ResumeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
