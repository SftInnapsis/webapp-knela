export type UserId = string

export type DataUser = {
   // user_id: number,
   // name: string,
   // username: string,
   email: string,
   password: string
}

export interface User {
   data: DataUser[],
   error: any;
   message: string;
}

export interface Users {
   data:    DataUsers[];
   error:   any;
   message: string;
}

export type DataUsers = {
   id:            number;
   idtipousuario: number;
   nombre:        string;
   email:         string;
   password:      string;
   is_active:     boolean;
}

// User Details

export interface UserDetails {
   // data:    Data;
   data:    any;
   error:   any;
   message: string;
}

export type Data = {
   id:              number;
   person_id:       number;
   name:            string;
   last_name:       string;
   email:           string;
   cellphone:       null;
   document_type:   string;
   document_number: string;
   image_url:       null;
   areas:           AreaUser[];
   role:           Role;
}

export type AreaUser = {
   id:                  number;
   name:                string;
   is_active:           boolean;
   position:            string;
   has_self_evaluation: boolean;
}

export type Role = {
   id:   number;
   name: string;
}
