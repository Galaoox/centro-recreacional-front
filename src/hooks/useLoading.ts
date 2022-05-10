import { LoadingContext } from "@context/LoadingContext";
import { useContext } from "react";

export function useLoading() {
    return useContext(LoadingContext);
}