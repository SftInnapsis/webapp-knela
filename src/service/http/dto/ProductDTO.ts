import { ApiDTO } from './ApiDTO';
// Structure for create Contact

export interface ProductsDTO extends ApiDTO {
   data: DataProducts[];
}

export type DataProducts = {
   nombre: string,
   codigo:string,
   precio_oferta:number,
   sub_familia:string,
   familia:string,
   stock:number
}


// Contact Details

// export interface ContactDetailsDTO extends ApiDTO {
//    data: DataContactDetails;
// }

// export type DataContactDetails = {
//    nombre: string,
//    rut: string,
//    giro: string,
//    telefono: string,
//    fax: string,
//    provedoor: string,
//    email: string,
//    direccion: string
// }
// export type ContactDTO = {
//    nombre: string,
//    rut: string,
//    giro: string,
//    telefono: string,
//    fax: string,
//    provedoor: string,
//    email: string,
//    direccion: string
// }

