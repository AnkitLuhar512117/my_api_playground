// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, name? }
  const [profile, setProfile] = useState(null); // profile document from backend
  const [loading, setLoading] = useState(true);
  const [justAuthed, setJustAuthed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    setLoading(false);
    if (u) refreshProfile(); // hydrate profile
  }, []);

  const refreshProfile = async () => {
    try {
      const p = await api.get("/profile/me");
      setProfile(p);
    } catch (err) {
      setProfile(null);
      // Not throwing here; profile may not exist yet
    }
  };

  const login = async (email, password) => {
    const data = await api.post("/auth/login", { email, password });
    if (!data.token) throw new Error("No token returned from server");
    localStorage.setItem("token", data.token);
    // server returns user and profile
    const userObj = data.user || { id: data.user?.id, email };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    if (data.profile) setProfile(data.profile);
    else await refreshProfile();
    setJustAuthed(true);
  };

  const register = async (formData) => {
    // formData must be FormData (multipart) to support resume file
    const data = await api.post("/auth/register", formData, true);
    if (!data.token) throw new Error("No token returned from server");
    localStorage.setItem("token", data.token);
    const userObj = data.user || {
      id: data.user?.id,
      email: formData.get("email"),
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    // registration created profile server-side; fetch it
    await refreshProfile();
    setJustAuthed(true);
  };

  const updateProfile = async (formData) => {
    // accepts FormData or JSON object
    const isForm = formData instanceof FormData;
    const updated = await api.put("/profile/me", formData, isForm);
    setProfile(updated);
    // sync user name/email if changed
    if (updated?.name || updated?.email) {
      const merged = {
        ...user,
        name: updated.name ?? user?.name,
        email: updated.email ?? user?.email,
      };
      setUser(merged);
      localStorage.setItem("user", JSON.stringify(merged));
    }
    return updated;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setProfile(null);
    setJustAuthed(false);
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      login,
      register,
      updateProfile,
      logout,
      refreshProfile,
      justAuthed,
      setJustAuthed,
    }),
    [user, profile, loading, justAuthed]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
