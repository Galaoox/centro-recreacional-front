import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";


export function RegisterUser(data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/auth/register`,data,{
            signal: controller.signal,
        }),
        controller
    }
}



export function LoginUser(data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/auth/login`,data,{
            signal: controller.signal,
        }),
        controller
    }
}