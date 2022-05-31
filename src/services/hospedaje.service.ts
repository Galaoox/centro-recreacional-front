import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";


export function CreateHospedaje(data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/hospedaje`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function GetAllHospedajesByUsuario(){
    const controller = loadAbort();
    return {
        call: axios.get<any>(`${API}/hospedaje/getAllHospedajesByUsuario`, {
            signal: controller.signal,
        }),
        controller
    }
}