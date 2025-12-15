/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next"; // 👈 Import this

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

  useEffect(() => {
    // 🛠️ FIX: Read from Cookie, not LocalStorage
    const token = getCookie("accessToken");

    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);
      } catch (error) {
        logout();
      }
    }
  }, []);

  const logout = () => {
    // 🛠️ FIX: Delete Cookie, not LocalStorage
    deleteCookie("accessToken");
    setUser(null);
    router.push("/admin/login");
  };

  return { user, logout };
};
