import { useAuth } from "../context/authContext";

export const login = async (email, password) => {
  const { setToken } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    setToken(data.token);
    return true;
  } else {
    return false;
  }
};

export const logout = () => {
  const { setToken } = useAuth();
  localStorage.removeItem("token");
  setToken(null);
};

export const currentUser = async (token) => {
  if (!token) {
    return null;
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/auth/getCurrentUser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.user;
  } else {
    return null;
  }
};
