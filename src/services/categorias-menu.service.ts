import { API } from "@config/env";
import { CategoriasMenu } from "@models/categorias-menu";
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllCategoriasMenu(){
    const controller = loadAbort();

    return {
        call: axios.get<CategoriasMenu[]>(`${API}/categorias-menu`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetCategoriasMenu(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<CategoriasMenu>(`${API}/categorias-menu/findOne/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateCategoriasMenu(data: Partial<CategoriasMenu>){
    const controller = loadAbort();
    return {
        call: axios.post<CategoriasMenu>(`${API}/categorias-menu`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateCategoriasMenu(id: number,data: Partial<CategoriasMenu>){
    const controller = loadAbort();
    return {
        call: axios.put<CategoriasMenu>(`${API}/categorias-menu/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteCategoriasMenu(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/categorias-menu/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

