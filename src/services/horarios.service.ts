import { API } from "@config/env";
import { Horarios } from "@models/horarios";
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllHorarios(){
    const controller = loadAbort();

    return {
        call: axios.get<Horarios[]>(`${API}/horarios`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetHorarios(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<Horarios>(`${API}/horarios/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateHorarios(data: Partial<Horarios>){
    const controller = loadAbort();
    return {
        call: axios.post<Horarios>(`${API}/horarios`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateHorarios(id: number,data: Partial<Horarios>){
    const controller = loadAbort();
    return {
        call: axios.put<Horarios>(`${API}/horarios/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteHorarios(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/horarios/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

