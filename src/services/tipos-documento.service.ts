import { API } from "@config/env";
import { TipoDocumento } from '@models/tipo-documento';
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllTiposDocumento(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoDocumento[]>(`${API}/tipos-documentos`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetTipoDocumento(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<TipoDocumento>(`${API}/tipos-documentos/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateTipoDocumento(data: Partial<TipoDocumento>){
    const controller = loadAbort();
    return {
        call: axios.post<TipoDocumento>(`${API}/tipos-documentos`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateTipoDocumento(id: number,data: Partial<TipoDocumento>){
    const controller = loadAbort();
    return {
        call: axios.put<TipoDocumento>(`${API}/tipos-documentos/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteTipoDocumento(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/tipos-documentos/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

export function UploadImageTipoDocumento(id: number, data: FormData){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/tipos-documentos/${id}`,data,{
            signal: controller.signal,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }),
        controller
    }
}