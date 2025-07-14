import type IUser from "./user"

export interface IMessage {
    id: number
    content: string
    userId?: number
    createdAt: string
    updatedAt?: string
    User?: IUser // Opcional, si quieres incluir información del usuario
}