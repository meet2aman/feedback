"use client";

import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { User } from "@/models/User";

type AuthContextType = {
  session: Session | null;
  currentUserDetails: User | null;
  fetchCurrentUserDetails: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  currentUserDetails: null,
  fetchCurrentUserDetails: async () => {},
});

function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: Session | null;
}) {
  // const nextsession = await auth();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [currentUserDetails, setCurrentUserDetails] = useState<User | null>(
    null
  );

  const fetchCurrentUserDetails = async () => {
    console.log("fetched Called ---------");
    try {
      const res = await axios.get("/api/me");
      console.log("response------", res);
      setCurrentUserDetails(res.data.data); // assuming { user: {...} }
    } catch (err) {
      console.error("Failed to fetch current user details:", err);
      setCurrentUserDetails(null);
    }
  };

  useEffect(() => {
    fetchCurrentUserDetails();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        currentUserDetails,
        fetchCurrentUserDetails,
      }}
    >
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
