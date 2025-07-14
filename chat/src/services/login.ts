import type { IApiResponse } from "../interfaces/api";
import type ILogin from "../interfaces/login";
import axios from "axios";
import { ENDPOINT } from "../config/config";

/**
 * Función para iniciar sesión
 * @param email - Correo electrónico del usuario
 * @param password - Contraseña del usuario
 * @returns Un objeto con el resultado de la operación
 */

export interface LoginResponse {
    token: string;
    role: string;
    message: string;
}

export default async function loginService({ email, password }: ILogin): Promise<IApiResponse<Omit<LoginResponse, "token">>> {
  try {
    const response = await axios.post<LoginResponse>(`${ENDPOINT}/auth/login`, { email, password });
    const { ...userData } = response.data;
    return {
      success: true,
      message: response.data.message,
      data: userData ? userData : undefined,
    };
  } catch (error) {
    if (error instanceof Error && error.response?.data?.error) {
      throw new HTTPException(401, error.response.data.error);
    }
    throw new HTTPException(401, "Error al iniciar sesión");
  }
}

class HTTPException {
  status_code: number;
  detail: string;
  constructor(status_code: number, detail: string) {
    this.status_code = status_code;
    this.detail = detail;
  }
}
