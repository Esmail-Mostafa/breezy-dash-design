const API_URL = "https://dummyjson.com/auth";

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
