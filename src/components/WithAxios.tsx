import { FC, useContext, useMemo, useEffect } from 'react';
import axios from 'axios'
import { useAuth } from '../hooks/useAuth';

const WithAxios: FC<any> = ({ children }) => {

    useEffect(() => {
        axios.interceptors.request.use((request:any) => {
            const datalocal = localStorage.getItem('user');
            if(datalocal){
                const user = JSON.parse(datalocal);
                console.log(user);
                request.headers.Authorization = `Bearer ${user.accessToken}`;
            }else{
                request.headers.Authorization = `Bearer ${''}`;
            }
            return request;
        })
    }, [])

    return children
}

export default WithAxios
