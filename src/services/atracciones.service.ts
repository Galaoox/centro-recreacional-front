import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";

export function GetAllAtracciones(){
    const controller = loadAbort();

    return {
        call: axios.get<any[]>(`${API}atracciones`, {
            signal: controller.signal
        }),
        controller
    }
}