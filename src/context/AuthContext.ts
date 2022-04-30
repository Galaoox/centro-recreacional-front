import { createContext } from "react";
// todo: cambiar los tipos
interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export let AuthContext = createContext<AuthContextType>(null!);
