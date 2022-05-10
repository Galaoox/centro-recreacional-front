import { API } from "@config/env";
import { TipoAlojamiento } from "@models/tipo-alojamiento";
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllTiposAlojamiento(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoAlojamiento[]>(`${API}/tipos-alojamiento`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetTipoAlojamiento(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<TipoAlojamiento>(`${API}/tipos-alojamiento/findOne/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateTipoAlojamiento(data: Partial<TipoAlojamiento>){
    const controller = loadAbort();
    return {
        call: axios.post<TipoAlojamiento>(`${API}/tipos-alojamiento`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateTipoAlojamiento(id: number,data: Partial<TipoAlojamiento>){
    const controller = loadAbort();
    return {
        call: axios.put<TipoAlojamiento>(`${API}/tipos-alojamiento/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteTipoAlojamiento(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-alojamiento/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

export function UploadImageTipoAlojamiento(id: number, data: FormData){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/tipos-alojamiento/${id}`,data,{
            signal: controller.signal,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        controller
    }
}