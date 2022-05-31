import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";


export function GetAllTiposAdiciones(){
    const controller = loadAbort();

    return {
        call: axios.get<any[]>(`${API}/tipos-adicion-alojamiento`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetTiposAdiciones(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<any>(`${API}/tipos-adicion-alojamiento/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateTiposAdiciones(data: Partial<any>){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/tipos-adicion-alojamiento`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateTiposAdiciones(id: number,data: Partial<any>){
    const controller = loadAbort();
    return {
        call: axios.put<any>(`${API}/tipos-adicion-alojamiento/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteTiposAdiciones(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-adicion-alojamiento/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}