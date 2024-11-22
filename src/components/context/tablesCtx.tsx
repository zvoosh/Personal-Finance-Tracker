import React, { createContext, useRef, useState } from "react";
import { Rows, Table } from "../types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type ContextType = {
  value: Table[] | null;
  setValue: React.Dispatch<React.SetStateAction<Table[] | null>>;
  tableName: String[] | null;
  setTableName: React.Dispatch<React.SetStateAction<String[] | null>>;
  table: Table | null;
  setTable: React.Dispatch<React.SetStateAction<Table | null>>;
  activeTableRef: React.MutableRefObject<String | null>;
};

export const TableContext = createContext<ContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<Table[] | null>(null);
  const [tableName, setTableName] = useState<String[] | null>(null);
  const [table, setTable] = useState<Table | null>(null);
  const activeTableRef = useRef<String | null>(null);
  

  return (
    <TableContext.Provider
      value={{
        value,
        setValue,
        tableName,
        setTableName,
        table,
        setTable,
        activeTableRef,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
