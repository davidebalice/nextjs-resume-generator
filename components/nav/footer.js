"use client";
import { useAuth } from "@/context/authContext";

export default function Footer() {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <footer
      className="flex justify-center items-center p-1"
      style={{ zIndex: 10 }}
    >
      <a href="https://www.davidebalice.dev" target="_blank">
        www.davidebalice.dev
      </a>
    </footer>
  );
}
