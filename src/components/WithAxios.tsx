import { FC, useContext, useMemo } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth';

const WithAxios: FC<any> = ({ children }) => {
    const { user } = useAuth();

    useMemo(() => {
        axios.interceptors.request.use(request => {
            if (user.accessToken && request.headers) {
                request.headers['Authorization'] = `Bearer ${user.accessToken}`;
            }
            return request;
        })
    }, [user])

    return children
}

export default WithAxios
