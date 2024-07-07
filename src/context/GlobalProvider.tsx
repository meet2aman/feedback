"use client";

import { Message } from "@/models/User";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
export interface MyMongoObject {
  _id: string;
  name: string;
  email: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MyMongoObject>({
    _id: "",
    name: "",
    email: "",
    username: "",
    isVerified: false,
    isAcceptingMessage: false,
    messages: [],
  });

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/user-details");
      console.log(response.data.data);
      setUser(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

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
