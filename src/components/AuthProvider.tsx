import { AuthContext } from "@context/AuthContext";
import { fakeAuthProvider } from "@services/auth";
import { ReactNode, useState } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
    let [user, setUser] = useState<any>(null);
  
    let signin = (newUser: string, callback: VoidFunction) => {
      return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
      });
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
