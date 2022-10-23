import { http } from '../http/http';
import { UserDetailsDTO,UserDTO,UserPost,UserRequestPost, UsersDTO} from '../http/dto/UserDTO';
import { UserDetails, Users } from '../models/User';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { User } from '../models/User';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const userRepository = {

   // getUser: async (idToken: string) => {
   //    const user = await http.post('http://localhost/login22', JSON.stringify({'token': idToken }) )
   //    return user
   // },
   getUser: async (): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const user = await http.get<any>(`${API_URL_BASE}/v1/user/${rut_empresa}` )
      const {data,error,message} = user
      return {
         data,
         error,
         message
      };
   },
   getUserPage: async (perPage, page): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const user = await http.get<any>(`${API_URL_BASE}/v1/user/${rut_empresa}?per_page=${perPage}&page=${page}` )
      const {data,error,message} = user
      return {
         data,
         error,
         message
      };
   },
   getUserSearch: async (search: string): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const user = await http.get<any>(`${API_URL_BASE}/v1/user?search=${search}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}` )
      const {data,error,message} = user
      return {
         data,
         error,
         message
      };
   },
   getUsers: async (search: string) : Promise<Users>=> {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const users = await http.get<UsersDTO>(`${API_URL_BASE}/v1/manage-users${search}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`);
      const { data, error, message } = users;
      return {
         data: (data||[]).map((raw) => ({
            id: raw?.id,
            idtipousuario: raw?.idtipousuario,
            nombre: raw?.nombre,
            email: raw?.email,
            password: raw?.password,
            is_active: raw?.is_active,
         })),
         error,
         message
      }
   },
   getUserDetails: async (id: number) : Promise<UserDetails>=> {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const users = await http.get<UserDetailsDTO>(`${API_URL_BASE}/v1/manage-users/${id}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`);

      let { data, error, message } = users;

      return {
         data,
         error,
         message
      }
   },
   createUser: async (dataUser) : Promise<any> => {

      const resp= await http.post<any>(`${API_URL_BASE}/v1/user`, {
         idtipousuario: dataUser.idtipousuario,
         nombre: dataUser.nombre,
         user_nick: dataUser.user_nick,
         email: dataUser.email_admin,
         password: dataUser.password,
         telefono: dataUser.telefono,
         idarea: dataUser.idarea,
         idempresacliente: dataUser.idempresacliente,
         participacion: dataUser.participacion
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   // updateUser: async (id: number, dataUser: UserPost) : Promise<any> => {
   //    const userEdited = await http.patch<UserDetailsDTO>(`${API_URL_BASE}/v1/manage-users/${id}`, {
   //       idtipousuario: dataUser.idtipousuario,
   //       nombre: dataUser.nombre,
   //       email: dataUser.email,
   //       password: dataUser.password,
   //       role: dataUser.role,
   //    });
   //    return userEdited;
   // },
   updateStatusUser: async (id: number, dataUser: UserPost) : Promise<any> => {
      const userEdited = await http.patch<UserDetailsDTO>(`${API_URL_BASE}/v1/manage-users/${id}`, {
         // is_active: dataUser.is_active
      });

      return userEdited;
   },
   // deleteUser: async (id: number) : Promise<any> => {
   //    const userDeleted = await http.delete(`${API_URL_BASE}/v1/manage-users/${id}`)
   //    return userDeleted;
   // },
   //verificaciones user
   verifyUsernick: async (user_nick:string) : Promise<any> => {
      const resp = await http.post<any>(`${API_URL_BASE}/v1/user/verify-nick`, {
         user_nick: user_nick
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      }
   },
   verifyEmail: async (email:string) : Promise<any> => {
      const resp = await http.post<any>(`${API_URL_BASE}/v1/user/verify-email`, {
         email: email
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      }
   },
   getUserData: async (): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const response = await http.get<any>(`${API_URL_BASE}/v1/user/data/initial?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`);
      const { data, error, message } = response;
      return {
         data,
         error,
         message
      }
   },
   updateUser: async (id: number, dataUser) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/user/${id}`, {
         idtipousuario: dataUser.idtipousuario,
         nombre: dataUser.nombre,
         user_nick: dataUser.user_nick,
         email: dataUser.email_admin,
         password: dataUser.password,
         telefono: dataUser.telefono
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateParticipationUsers: async (participacion) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/user/participacion/data`, {
         participacion:participacion
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteUser: async (id: number) : Promise<any> => {
      const userDeleted = await http.delete(`${API_URL_BASE}/v1/user/${id}`)
      return userDeleted;
   },

   ResendPassword: async (idusuario) : Promise<any> => {
      const resp = await http.post<any>(`${API_URL_BASE}/v1/user/${idusuario}`, {})
      return resp;
   },
}
