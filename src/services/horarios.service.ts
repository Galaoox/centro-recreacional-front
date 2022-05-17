import { API } from "@config/env";
import { loadAbort } from "@utilities/load-abort-axios.utility";
import axios from "axios";

export function GetAllHorarios(){
    const controller = loadAbort();

    return {
        call: axios.get<any[]>(`${API}/horarios`, {
            signal: controller.signal
        }),
        controller
    }
}