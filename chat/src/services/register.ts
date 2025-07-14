import axios, { AxiosError } from "axios";
import type IUser from "../interfaces/user";
import { ENDPOINT } from "../config/config";

export const registerUser = async (user: IUser) => {
  try {
    const response = await axios.post(`${ENDPOINT}/users`, user);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;

    // Si hay respuesta del servidor (400, 500, etc.)
    if (error.response && error.response.data) {
      throw new Error(
        typeof error.response.data === 'string'
          ? error.response.data
          : (error.response.data as any).error || "Registration failed"
      );
    }

    // Si es un error de red o sin respuesta
    throw new Error("Network error or server is unreachable");
  }
};
