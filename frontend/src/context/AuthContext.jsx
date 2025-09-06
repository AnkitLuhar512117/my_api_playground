
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
  const [user, setUser] = useState(null); 
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [justAuthed, setJustAuthed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    const u = raw ? JSON.parse(raw) : null;
    setUser(u);
    setLoading(false);
    if (u) refreshProfile(); 
  }, []);

  const refreshProfile = async () => {
    try {
      const p = await api.get("/profile/me");
      setProfile(p);
    } catch (err) {
      setProfile(null);
    }
  };

  const login = async (email, password) => {
    const data = await api.post("/auth/login", { email, password });
    if (!data.token) throw new Error("No token returned from server");
    localStorage.setItem("token", data.token);

    const userObj = data.user || { id: data.user?.id, email };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    if (data.profile) setProfile(data.profile);
    else await refreshProfile();
    setJustAuthed(true);
  };

  const register = async (formData) => {
  
    const data = await api.post("/auth/register", formData, true);
    if (!data.token) throw new Error("No token returned from server");
    localStorage.setItem("token", data.token);
    const userObj = data.user || {
      id: data.user?.id,
      email: formData.get("email"),
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    await refreshProfile();
    setJustAuthed(true);
  };

  const updateProfile = async (formData) => {
    const isForm = formData instanceof FormData;
    const updated = await api.put("/profile/me", formData, isForm);
    setProfile(updated);
    
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
