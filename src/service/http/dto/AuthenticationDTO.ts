import { Status, ApiDTO } from './ApiDTO';

export interface LoginDTO extends ApiDTO {
   data?: {
      token_type: string,
      expires_in: number,
      access_token: string,
      message?: string,
      detail?:any
   },
   errors?: any | null,
   message: string,
   timestamp: string
}

export type LogoutDTO = undefined | ApiDTO

export type Roles= {
   id: number,
   name: string,
}

export interface UserDTO extends ApiDTO {
   data?: {
      iduser: number,
      iduser_type: number,
      idmedical_center: number,
      name: string,
      last_name: string,
      rut: string,
      date_birth?: string,
      mail?: string,
      idarea?: number,
      idspecialty?: number,
      address?: string,
      iddistrict?: number,
      role: string,
   },

}
