import React, { createContext, useState } from "react";
import {  UserType } from "../types";

type ContextType = {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  user: UserType | null
};

export const Context = createContext<ContextType | undefined>(undefined);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);


  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
