import React, { createContext, useState } from "react";
import { Expenses, UserType } from "../types";

type ContextType = {
  value: Expenses[] | null;
  setValue: React.Dispatch<React.SetStateAction<Expenses[] | null>>;
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  getUserExpenses: () => Expenses[] | undefined;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const Context = createContext<ContextType | undefined>(undefined);

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<Expenses[] | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const getUserExpenses = () => {
    if (value && value.length > 0)
      return value.filter((expense) => expense.userId === userId);
  };

  return (
    <Context.Provider
      value={{
        value,
        setValue,
        userId,
        setUserId,
        getUserExpenses,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
