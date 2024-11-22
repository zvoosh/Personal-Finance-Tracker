import React, { createContext, useContext, useState } from 'react';

type RefetchContextType = {
  refetch: () => void;
  triggerRefetch: () => void;
};

const RefetchContext = createContext<RefetchContextType | undefined>(undefined);

export const RefetchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const refetch = () => setShouldRefetch(false); // Called in the page with useQuery
  const triggerRefetch = () => setShouldRefetch(true); // Called on the other page

  return (
    <RefetchContext.Provider value={{ refetch, triggerRefetch }}>
      {children}
    </RefetchContext.Provider>
  );
};

export const useRefetchContext = () => {
  const context = useContext(RefetchContext);
  if (!context) throw new Error("useRefetchContext must be used within a RefetchProvider");
  return context;
};
