import { http } from '../http/http';
import { LoginDTO, LogoutDTO, UserDTO } from '../http/dto/AuthenticationDTO';
import { Login, Logout, Authentication } from '../models/Authentication';
import { API_URL_BASE, API_URL_SOFTNET } from '@/toolbox/defaults/app';
import { readLocalStorage, saveLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_OPTIONS_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';

export const authenticationRepository = {
   login: async (rut: string, password: string, perfil :number): Promise<Login> => {
      const resp = await http.post<LoginDTO>(`${API_URL_BASE}/v1/auth/login`, {
         rut: rut,
         password: password,
         type_user:perfil
      })
      return {
         error: resp.error,
         status: resp.status,
         message: resp.message,
         data: !!resp.data ? {
            token: resp.data?.access_token || '',
            expires_in: resp.data?.expires_in || 0,
            token_type: resp.data?.token_type || '',
            message: resp.data?.message || '',
            detail: resp.data?.detail || {},
         } : undefined
      }
   },
   changePassword: async (password): Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/user?`, {
         password: password
      })
      return resp
   },
   logout: async (): Promise<Logout> => {
      const resp = await http.post<LogoutDTO>(`${API_URL_BASE}/v1/auth/sign-out`)
      console.log(resp)
      return {
         error: resp?.error,
         status: resp?.status,
         message: resp?.message
      }
   },
   profile: async (access_token: string, resp: any) => {
      console.log(resp)
      // const userData = readLocalStorage(KEY_USER_DATA)
      saveLocalStorage(KEY_OPTIONS_MEDICAL_CENTER,resp?.medical_center )
      console.log(resp)
      // console.log(userData)
      if( resp.information_user?.role != ROLE_SUPER_ADMIN){
         saveLocalStorage(KEY_MEDICAL_CENTER, resp?.medical_center[0].idmedical_center)
      }
     
      return {
         user: {
            iduser: resp.information_user?.iduser,
            iduser_type: resp.information_user?.iduser_type,
            idmedical_center: null,
            name: resp.information_user?.name,
            last_name: resp.information_user?.last_name,
            rut: resp.information_user?.rut,
            date_birth:resp.information_user?.date_birth,
            mail: resp.information_user?.mail,
            idarea: resp.information_user?.idarea,
            name_area: resp.information_user?.name_area,
            id_professional: resp.information_user?.id_professional,
            id_doctor: resp.information_user?.id_doctor,
            id_tutor: resp.information_user?.id_tutor,
            idspecialty: resp.information_user?.idspecialty,
            address: resp.information_user?.address,
            iddistrict: resp.information_user?.iddistrict,
            role: resp.information_user?.role,
            medical_center: resp?.medical_center || [],
            main_redirect: '/',
         },
         error: null,
         token: access_token
      }
   },
   // profile: async (access_token: string): Promise<Authentication> => {
   //    const resp = await http.get<UserDTO>(`${API_URL_BASE}/v1/auth/me`)
   //    return {
   //       user: {
   //          id: resp.data?.id,
   //          iduser_type: resp.data?.iduser_type,
   //          idmedical_center:resp.data?.idmedical_center,
   //          name: resp.data?.name,
   //          last_name: resp.data?.last_name,
   //          rut: resp.data?.rut,
   //          date_birth:resp.data?.date_birth,
   //          mail: resp.data?.mail,
   //          idarea: resp.data?.idarea,
   //          idspecialty: resp.data?.idspecialty,
   //          address: resp.data?.address,
   //          iddistrict: resp.data?.iddistrict,
   //          role: resp.data?.role,
   //          main_redirect: '/',
   //       },
   //       error: resp.error,
   //       token: access_token
   //    }
   // },

}

