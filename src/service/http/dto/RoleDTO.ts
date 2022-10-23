import { ApiDTO } from './ApiDTO'

export interface RolesDTO extends ApiDTO {
   data: Data[];
}

export type Data = {
   id:   number;
   name: string;
}
