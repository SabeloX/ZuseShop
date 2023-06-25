import { useState } from "react"
import { config } from "../config";
import axios from "axios";

export type APIType = {
    url: string;
    method: "post" | "get";
}

/**
 * A hook to make an API call
 * @param body object { url, method }
 * @returns an object { loading, execute, data, error, succeeded }
 */
export const useAPI = ({ url, method } : APIType) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [succeeded, setSucceeded] = useState<boolean>(false);

    // Make an API request using axios
    const execute = async (inputData?: any) => {
        try {
            setLoading(true);
            const response = await ( method === "post" ? axios.post(config.domain + url, inputData) : axios.get(config.domain + url))
            setData(response.data);
            setError(null);
            setSucceeded(true);
        }
        catch (error) {
            setError(error);
            setLoading(false);
            setSucceeded(false);
        }
        finally {
            setLoading(false);
        }
    }

    return {
        loading,
        execute,
        data,
        error,
        succeeded
    }
}