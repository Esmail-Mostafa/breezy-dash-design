import { useNavigate } from "react-router-dom";

const API_URL = "https://dummyjson.com/auth";
const navigate = useNavigate();

export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins: 60 }),
  });

  if (!res.ok) throw new Error("Invalid credentials");
  if (res.status === 401) throw new Error("Invalid credentials");
  const data = await res.json();

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);

  return data;
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    //  credentials: "include",
  });

  if (!res.ok) throw new Error("Unauthenticated");
  return res.json();
};
// export const refreshToken = async () => {
//   const refresh = localStorage.getItem("refreshToken");

//   const res = await fetch(`${API_URL}/refresh`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       refreshToken: refresh,
//       expiresInMins: 60,
//     }),
//     // credentials: "include", // لو API بتستخدم كوكيز
//   });

//   // ❌ لو التوكن غير صالح
//   if (res.status === 401) {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     window.location.replace("/login"); // ⛔ الرجوع لتسجيل الدخول
//     throw new Error("Invalid refresh token");
//   }

//   if (!res.ok) throw new Error("Failed to refresh");

//   const data = await res.json();

//   // ✅ حفظ التوكن الجديد
//   localStorage.setItem("accessToken", data.accessToken);
//   localStorage.setItem("refreshToken", data.refreshToken);

//   // ✅ إعادة تحميل الصفحة الحالية لإعادة المحاولة بنفس المسار
//   window.location.replace(window.location.href);
// };
