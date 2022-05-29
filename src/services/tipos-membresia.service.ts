import { API } from "@config/env";
import { TipoMembresia } from '@models/tipo-membresia';
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllTiposMembresia(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoMembresia[]>(`${API}/tipos-membresias`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetTipoMembresia(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<TipoMembresia>(`${API}/tipos-membresias/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateTipoMembresia(data: Partial<TipoMembresia>){
    const controller = loadAbort();
    return {
        call: axios.post<TipoMembresia>(`${API}/tipos-membresias`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateTipoMembresia(id: number,data: Partial<TipoMembresia>){
    const controller = loadAbort();
    return {
        call: axios.put<TipoMembresia>(`${API}/tipos-membresias/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteTipoMembresia(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-membresias/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

export function GetTiposDescuentos(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoMembresia[]>(`${API}/tipos-membresias/descuentos`, {
            signal: controller.signal
        }),
        controller
    }
}