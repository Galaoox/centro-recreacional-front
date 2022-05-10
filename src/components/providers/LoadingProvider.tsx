import { LoadingContext } from "@context/LoadingContext";
import { ReactNode, useState } from "react";

export function LoadingProvider({ children } : { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const value = { loading, setLoading };

    return (
      <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
    );
  }