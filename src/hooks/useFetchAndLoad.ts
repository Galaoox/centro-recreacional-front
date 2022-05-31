import { AxiosCall } from '@models/axios-call.model';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useLoading } from './useLoading';



const useFetchAndLoad = () => {
    const { loading, setLoading } = useLoading();
    // const [loading, setLoading] = useState(false);
    let controller: AbortController;

    const callEndpoint = async (axiosCall: AxiosCall<any>) => {
        if (axiosCall.controller) controller = axiosCall.controller;
        setLoading(true);
        let result = {} as AxiosResponse<any>;
        try {
            axiosCall.call
            result = await axiosCall.call;
        } catch (err: any) {
            setLoading(false);
            throw err;
        }
        setLoading(false);
        return result;
    };

    const cancelEndpoint = () => {
        setLoading(false);
        controller && controller.abort();
    };

    useEffect(() => {
        return () => {
            cancelEndpoint();
        };
    }, []);

    return { loading, callEndpoint };
};

export default useFetchAndLoad;