import { API } from "@config/env";
import { TipoAlojamiento } from "@models/tipo-alojamiento";
import { loadAbort } from "@utilities/load-abort-axios.utility"
import axios from "axios";


export function GetAllTiposAlojamiento(){
    const controller = loadAbort();

    return {
        call: axios.get<TipoAlojamiento[]>(`${API}tipos-alojamiento`, {
            signal: controller.signal
        }),
        controller
    }
}

