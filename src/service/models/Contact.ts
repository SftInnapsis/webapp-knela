import { Status } from "./ApiModel";
export interface Contacts {
   data: {
      clients: DataClients[],
      entities: DataClients[]
   };
   message: string,
   status: Status,
   error: Status
}

export interface ContactsPost {
   data?: DataClients[],
   message: string,
   status: Status
}

export type DataClients = {
   idcliente?: number,
   rut_cliente: string,
   nombre_rz: string,
   nombre_fantasia: string,
   giro: string,
   fax: string,
   prospecto: number,
   observacion?: string,
   extranjero: number,
   web?: string,
   direccion: string,
   idtipopersona: number,
   idtiporubro: number,
   idusuario_vendedor: number | null,
   idcomuna: number,
   cto_cargo: string,
   cto_email: string,
   cto_telefono: string,
   cto_celular?: string,
   cto_cobranza: number,
   action?:string,
}



