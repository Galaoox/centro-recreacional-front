import { API } from "@config/env";
import { TipoMembresia } from '@models/tipo-membresia';
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllTiposMembresia(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoMembresia[]>(`${API}/tipos-membresia`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetTipoMembresia(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<TipoMembresia>(`${API}/tipos-membresia/findOne/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateTipoMembresia(data: Partial<TipoMembresia>){
    const controller = loadAbort();
    return {
        call: axios.post<TipoMembresia>(`${API}/tipos-membresia`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateTipoMembresia(id: number,data: Partial<TipoMembresia>){
    const controller = loadAbort();
    return {
        call: axios.put<TipoMembresia>(`${API}/tipos-membresia/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteTipoMembresia(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-membresia/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}
