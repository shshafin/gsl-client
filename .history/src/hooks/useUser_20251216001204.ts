/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  userId: string;
  role: "super_admin" | "admin" | "moderator";
  email: string;
  iat: number;
  exp: number;
}

export const useUser = () => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();
  console.log(first)

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (error) {
        // Invalid token
        logout();
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login"); // Assuming you have a login route
  };

  return { user, logout };
};
