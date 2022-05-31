import { API } from "@config/env";
import {TipoAdicionAlojamientos} from "@models/tipos-adicion-alojamiento";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";

export function GetAllTipoAdicionAlojamientos(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoAdicionAlojamientos[]>(`${API}tipos-adicion-alojamiento`, {
            signal: controller.signal
        }),
        controller
    }
}

export function GetTiposAdicionesAlojamientos(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<TipoAdicionAlojamientos>(`${API}/tipos-adicion-alojamiento/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateAdicionAlojamiento(data: Partial<TipoAdicionAlojamientos>){
    const controller = loadAbort();
    return {
        call: axios.post<TipoAdicionAlojamientos>(`${API}/tipos-adicion-alojamiento`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateAdicionAlojamiento(id: number,data: Partial<TipoAdicionAlojamientos>){
    const controller = loadAbort();
    return {
        call: axios.put<TipoAdicionAlojamientos>(`${API}/tipos-adicion-alojamiento/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteAdicionAlojamiento(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-adicion-alojamiento/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

