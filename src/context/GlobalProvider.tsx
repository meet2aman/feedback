"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  interface User {
    username: string;
    email: string;
    password: string;
  }
  const [user, setUser] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal() {
  const global = useContext(GlobalContext);
  return global;
}
