import { Status } from "./ApiModel";

export type Roles = {
   id: number,
   name: string,
}

export type User = {
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
   role?: string | "",
   main_redirect?: string,
}

export interface Login {
   data?: {
      token_type: string,
      token: string,
      expires_in: number,
      message?: string,
      detail?:any,
   },
   message: string,
   status: Status,
   error: Status
}

export interface Logout {
   message?: string,
   status?: Status,
   error?: Status
}

export interface Authentication {
   user: User | null | undefined,
   data?: {
      token_type: string,
      token: string,
      expires_in: number,
      message?: string,
   },
   token: string,
   error?: Status
}
