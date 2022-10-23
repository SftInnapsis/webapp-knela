import { ApiDTO } from './ApiDTO';

export interface RuleDTO extends ApiDTO {
   data: DataRule[];
}

export type DataRule = {
   // id: number;
   // idtipousuario: number;
   // nombre: string;
   // email: string;
   // password: string;
   // is_active: boolean;
}

