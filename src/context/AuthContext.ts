import { AuthInfo } from "@models/auth-info.model";
import { createContext } from "react";
// todo: cambiar los tipos
interface AuthContextType {
    user: AuthInfo;
    signin: (user: any, callback: VoidFunction) => void;
    register: (user: any, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export let AuthContext = createContext<AuthContextType>(null!);
