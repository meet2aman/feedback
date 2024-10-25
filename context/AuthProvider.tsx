"use client";

import { SessionType } from "../types/next-auth";
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext<SessionType | null>(null);

function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: SessionType | null;
}) {
  console.log("from provider::::", initialSession);

  return (
    <AuthContext.Provider value={initialSession}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
