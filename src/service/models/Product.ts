
export interface Products {
   data:    DataProducts[];
   error:   any;
   message: string;
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

export interface ContactDetails {
   data:    any;
   error:   any;
   message: string;
}

