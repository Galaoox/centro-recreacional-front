import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";


export function CreateMembresia(data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/membresias`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function GetMembresiaUsuario(){
    const controller = loadAbort();
    return {
        call: axios.get<any>(`${API}/membresias/membresia-usuario`, {
            signal: controller.signal,
        }),
        controller
    }
}