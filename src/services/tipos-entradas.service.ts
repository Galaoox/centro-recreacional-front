import { API } from "@config/env";
import {TiposEntradas} from "@models/tipos-entradas.model";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";

export function GetAllTiposEntradas(){
    const controller = loadAbort();

    return {
        call: axios.get<TiposEntradas[]>(`${API}/tipos-entradas`, {
            signal: controller.signal
        }),
        controller
    }
}

export function GetTiposEntradas(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<TiposEntradas>(`${API}/tipos-entradas/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateTiposEntradas(data: Partial<TiposEntradas>){
    const controller = loadAbort();
    return {
        call: axios.post<TiposEntradas>(`${API}/tipos-entradas`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateTiposEntradas(id: number,data: Partial<TiposEntradas>){
    const controller = loadAbort();
    return {
        call: axios.put<TiposEntradas>(`${API}/tipos-entradas/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteTiposEntradas(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-entradas/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

