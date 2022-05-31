import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";


export function CreateEntrada(data: any){
    const controller = loadAbort();
    return {
        call: axios.post<any>(`${API}/entradas`,data, {
            signal: controller.signal,
        }),
        controller
    }
}