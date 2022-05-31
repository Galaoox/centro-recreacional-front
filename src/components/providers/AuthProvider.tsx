import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "@context/AuthContext";
import useFetchAndLoad from "@hooks/useFetchAndLoad";
import { AuthInfo } from "@models/auth-info.model";
import { fakeAuthProvider } from "@services/auth";
import { LoginUser, RegisterUser } from '@services/auth.service';
import { Spin } from "antd";
import { ReactNode, useEffect, useState } from "react";

enum Roles {
    ADMIN = 1,
    USER = 2,
}

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'red' }} spin />;


export function AuthProvider({ children }: { children: ReactNode }) {
    let [user, setUser] = useState<AuthInfo>({
        isAdmin: false,
        accessToken: "",
        name: '',
    });
    const [loadingUser, setloadingUser] = useState(true);
    const { loading, callEndpoint } = useFetchAndLoad();



    let signin = async (newUser: any, callback: VoidFunction) => {
        const result = await callEndpoint(LoginUser(newUser));
        const data = new AuthInfo(result.data.access_token, result.data.nombre, result.data.rol == Roles.ADMIN);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        callback();
    };

    let register = async (newUser: string, callback: VoidFunction) => {
        const result = await callEndpoint(RegisterUser(newUser));
        const data = new AuthInfo(result.data.access_token, result.data.nombre, result.data.rol == Roles.ADMIN);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        callback();
    };

    let signout = (callback: VoidFunction) => {
        setUser(new AuthInfo());
        localStorage.setItem('user', JSON.stringify(new AuthInfo()));
        callback();
    };



    let value = { user, signin, signout, register };

    useEffect(() => {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            console.log('valores obtenidos');
            setUser(JSON.parse(userInfo));
        }
        setloadingUser(false);

        return () => {

        }
    }, [])

    if (loadingUser) {
        return (
            <div style={{
                margin: '20px 0',
                marginBottom: 20,
                padding: '30px 50px',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 4,
            }}>
                <Spin size='large' spinning={true} indicator={antIcon}/>
            </div>
        )

    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
