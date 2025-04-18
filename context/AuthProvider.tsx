"use client";

import axios from "axios";
import { SessionType } from "../types/next-auth";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";

type AuthContextType = {
  session: Session | null;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  refreshSession: async () => {},
});
function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  const [session, setSession] = useState<Session | null>(initialSession);

  const refreshSession = async () => {
    console.log("refreshedCalled");
    try {
      const res = await axios.get("/api/me");
      console.log("refreshed session:", res.data);

      setSession((prev) => ({
        ...prev!,
        user: {
          ...prev!.user,
          ...res.data.user,
        },
      }));
    } catch (err) {
      console.error("Failed to refresh session:", err);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ session, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextType {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
