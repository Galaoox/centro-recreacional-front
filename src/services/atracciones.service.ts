import { API } from "@config/env";
import { atracciones } from "@models/atracciones";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";

export function GetAllAtracciones(){
    const controller = loadAbort();

    return {
        call: axios.get<any[]>(`${API}/atracciones`, {
            signal: controller.signal
        }),
        controller
    }
}

export function GetAtracciones(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<atracciones>(`${API}/atracciones/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateAtracciones(data: Partial<atracciones>){
    const controller = loadAbort();
    return {
        call: axios.post<atracciones>(`${API}/atracciones`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateAtracciones(id: number,data: Partial<atracciones>){
    const controller = loadAbort();
    return {
        call: axios.put<atracciones>(`${API}/atracciones/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteAtracciones(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/atracciones/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

