import { API } from "@config/env";
import { ElementoMenu } from "@models/elemento-menu";
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllElementoMenu(){
    const controller = loadAbort();

    return {
        call: axios.get<ElementoMenu[]>(`${API}/elementos-menu`, {
            signal: controller.signal
        }),
        controller
    }
}


export function GetElementoMenu(id:number){
    const controller = loadAbort();

    return {
        call: axios.get<ElementoMenu>(`${API}/elementos-menu/findOne/${id}`, {
            signal: controller.signal
        }),
        controller
    }
}

export function CreateElementoMenu(data: Partial<ElementoMenu>){
    const controller = loadAbort();
    return {
        call: axios.post<ElementoMenu>(`${API}/elementos-menu`,data, {
            signal: controller.signal,
        }),
        controller
    }
}

export function UpdateElementoMenu(id: number,data: Partial<ElementoMenu>){
    const controller = loadAbort();
    return {
        call: axios.put<ElementoMenu>(`${API}/elementos-menu/${id}`,data, {
            signal: controller.signal,
        }),
        controller
    }
}


export function DeleteElementoMenu(id: number){
    const controller = loadAbort();
    return {
        call: axios.delete<any>(`${API}/elementos-menu/${id}`,{
            signal: controller.signal,
        }),
        controller
    }
}

export function UploadImageElementosMenu(id: number, data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/elementos-menu/upload/${id}`,data,{
            signal: controller.signal,
        }),
        controller
    }
}


export function GetAllElementoMenuGrouped(){
    const controller = loadAbort();

    return {
        call: axios.get<any[]>(`${API}/elementos-menu/grouped`, {
            signal: controller.signal
        }),
        controller
    }
}