import { useState } from "react"
import { config } from "../config";
import axios from "axios";

export type APIType = {
    url: string;
    method: "POST" | "GET";
}

/**
 * A hook to make an API call
 * @param body object { url, method }
 * @returns an object { loading, execute, data, error, succeeded }
 */
export const useAPI = ({ url, method } : APIType) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    const [succeeded, setSucceeded] = useState<boolean>(false);

    // Make an API request using axios
    const execute = async (inputData?: any) => {
        try {
            setLoading(true);
            const response = await axios.post(config.domain + url, inputData)
            setData(response.data);
            setSucceeded(true);
        }
        catch (error) {
            setError(true);
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