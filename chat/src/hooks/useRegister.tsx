import { registerUser } from "../services/register";
import { useState } from "react";
import type IUser from "../interfaces/user";

export default function useRegister() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    const register = async (user: IUser) => {
        try {
            setLoading(true);
            const response = await registerUser(user);
            setResponse(response);
            return response;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error desconocido");
            }
        } finally {
            setLoading(false);
            setTimeout(() => {
                setResponse(null);
                setError(null);
            }, 3000);
        }
    };

    return { register, loading, error, response };
}