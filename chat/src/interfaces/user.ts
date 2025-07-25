export default interface IUser {
  id?: number;
  email: string;
  username: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

