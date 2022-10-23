import { ApiDTO } from './ApiDTO';

// export type UserDTO = {
//    id: number;
//    idtipousuario: number;
//    nombre: string;
//    email: string;
//    password?: string;
//    role: string;
//    is_active: boolean;
// }
export interface UserDTO extends ApiDTO {
   data: DataUser[];
}

export type DataUser = {
   // id: number;
   // idtipousuario: number;
   // nombre: string;
   email: string;
   password: string;
   // is_active: boolean;
}

// List of UsersDTO

export interface UsersDTO extends ApiDTO {
   data: DataUsers[];
}

export type DataUsers = {
   id: number;
   idtipousuario: number;
   nombre: string;
   email: string;
   password: string;
   is_active: boolean;
}

// Structure for create User

export interface UserRequestPost extends ApiDTO {
   data: UserPost
}

export type UserPost = {
   idtipousuario: number,
   nombre: string,
   email: string,
   password: string,
   role: string;
}

// User Details

export interface UserDetailsDTO extends ApiDTO {
   data: Data;
}

export type Data = {
   id: number;
   idtipousuario: number,
   nombre: string,
   email: string,
   status_confirm: string,
   password: string,
   role: string;
   is_active: boolean;
}

export type Role = {
   id: number;
   name: string;
}


