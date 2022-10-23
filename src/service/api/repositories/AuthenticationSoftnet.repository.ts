import { http } from '../../http/http';
import { LoginDTO, LogoutDTO, UserDTO } from '../../http/dto/AuthenticationDTO';
import { Login, Logout, Authentication } from '../../models/Authentication';
import { API_URL_BASE, API_URL_SOFTNET } from '@/toolbox/defaults/app';

export const authenticationSoftnetRepository = {

   loginSoftnet: async (username: string, rut: string, password: string): Promise<any>=> {
      const resp = await http.post<any>(`${API_URL_SOFTNET}/login`, {
         username: username,
         rut: rut,
         password: password
      })
      return resp;
   },
   dataUser,
   dataEmpresa
}

function dataUser(token){
   return fetch(`${API_URL_SOFTNET}/datoUsuario`, {
     method: 'GET',
     headers: {
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(datosUsuarios => datosUsuarios.json())
     .then(datosUsuarios => {

       localStorage.setItem('dataUser', JSON.stringify(datosUsuarios[0]))
       return datosUsuarios[0];
     })
     .catch(error => {
       return false;
     })
 }

 function dataEmpresa(token){
   return fetch(`${API_URL_SOFTNET}/datoEmpresa`, {
     method: 'GET',
     headers: {
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(datosEmpresa => datosEmpresa.json())
     .then(datosEmpresa => {

      // localStorage.setItem('dataUser', JSON.stringify(datosEmpresa[0]))
       return datosEmpresa[0];
     })
     .catch(error => {
       return false;
     })
 }
