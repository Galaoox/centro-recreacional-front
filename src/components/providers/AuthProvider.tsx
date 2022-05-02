import { AuthContext } from "@context/AuthContext";
import { AuthInfo } from "@models/auth-info.model";
import { fakeAuthProvider } from "@services/auth";
import { ReactNode, useState } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
    let [user, setUser] = useState<AuthInfo>({
        isAdmin: false,
        accessToken: "",
        name: '',
    });
  
    let signin = (newUser: string, callback: VoidFunction) => {
      return fakeAuthProvider.signin(() => {
        setUser(new AuthInfo('test', newUser, newUser == 'admin'));
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return fakeAuthProvider.signout(() => {
        setUser(new AuthInfo());
        callback();
      });
    };
  
    let value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
