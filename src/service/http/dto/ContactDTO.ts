import { Data } from '@/service/models/User';
import { ApiDTO,  Status } from './ApiDTO';

export interface ContactsDTO extends ApiDTO {
   data:{
      clients: DataClients[],
      entities: DataEntities[]
   },
   errors?: any | null,
   message: string,
   timestamp: string
}
export interface ContactPostDTO extends ApiDTO {
   data?: DataClients[],
   status: Status,
   message: string,
   timestamp: string
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
}


export type DataEntities = {
   rut: string,
   idcomuna: number,
   idtiporubro: number,
   idusuario_vendedor: number,
   propietario: string,
   nombre_rz: string,
   nombre_fantasia: string,
   giro: string,
   telefono: string,
   fax: string,
   prospecto: number,
   observacion?: string,
   extranjero: number,
   web?: string,
   direccion: string,
   nombre_cto: string,
   cargo_cto: string,
   email_cto: string,
   telefono_cto: string,
   celular_cto?: string,
   cobranza_cto: number
}
