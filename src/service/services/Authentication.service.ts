import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {
   readLocalStorage,
   removeLocalStorage,
   saveLocalStorage
} from '@helpers/local-storage-helper';
import {
   KEY_ARRAY_MY_MENU,
   KEY_BYPASS,
   KEY_EMPRESA,
   KEY_NAVEGACION_SUB_MODULO,
   KEY_OBJECT_MY_MENU,
   KEY_SOFTNET,
   KEY_TOKEN_KYTE,
   KEY_TOKEN_SOFTNET,
   KEY_TOOGLE_MENU,
   KEY_USER_DATA
} from '@constants/local-storage';
import {ROUTE_HOME} from "@/toolbox/constants/route-map";
import { APP_AUTHORIZE_KEY } from '@defaults/app';
import { STATIC_ROUTERS } from '@defaults/static-routers';
import { ROLE_SUPER_ADMIN, ROLE_ADMIN, ROUTES_FOR_SUPER_ADMIN, ROUTES_FOR_ADMIN, ROUTES_FOR_SUPERVISOR,  ROUTES_FOR_VENDEDOR, ROLE_TRABAJADOR, ROUTES_FOR_TRABAJADOR, ROLE_ADMIN_PROYECCION, ROLE_PACIENTE} from '@defaults/static-roles';
import { MAIN_REDIRECT_FOR_SUPER_ADMIN, MAIN_REDIRECT_FOR_ADMIN} from '@defaults/static-roles';
import { removeAuthCookie, setAuthCookie, readAuthCookie } from '@helpers/cookie.helper';
import { authenticationRepository } from '../repositories/Authentication.repository';
import { Authentication } from '../models/Authentication';

const currentUserSubject = new BehaviorSubject<Authentication | null>(init());

export const authenticationService = {
   login,
   logout,
   end,
   ChangePassword,
   authCookie: readAuthCookie,
   currentUser: currentUserSubject.asObservable(),
   get currentUserValue () { return currentUserSubject.value }
};

function init() {
   const auth: Authentication = readLocalStorage(KEY_USER_DATA);
   axios.defaults.headers.common[APP_AUTHORIZE_KEY] = auth?.token || '';
   return auth;
}
function end() {
   removeLocalStorage(KEY_USER_DATA);
   removeLocalStorage(KEY_ARRAY_MY_MENU);
   removeLocalStorage(KEY_OBJECT_MY_MENU);
   removeLocalStorage(KEY_TOOGLE_MENU);
   removeAuthCookie();
   axios.defaults.headers.common[APP_AUTHORIZE_KEY] = null;
   currentUserSubject.next(null);
}
function createExpireToken( s: number ): Date {
   let now = new Date();
   let time = now.getTime();
   var expireTime = time + 1000*s;
   now.setTime(expireTime);
   return now
}

async function ChangePassword(password){
   const resp = await authenticationRepository.changePassword(password)
}

async function login( rut: string, password: string, perfil: number, from='') : Promise<Authentication> {
   try {
      const login = await authenticationRepository.login(rut, password, perfil, from);
      if (!!login.error) {
         return {
            user  : null,
            token : '',
            error : login.error
         }
      }
      const access_token = `${login.data?.token_type || ''} ${login.data?.token || ''}`;
      axios.defaults.headers.common[APP_AUTHORIZE_KEY] = access_token;
      const profile = login.data?.detail || {};
      console.log(login.data)
      console.log(login.data.detail)
      const auth = await authenticationRepository.profile(access_token, profile);
      const expire_time = login.data?.expires_in ? createExpireToken(login.data?.expires_in) : 0;
      console.log(auth);
      if (!!auth.error) {
         console.log('entreee');
         return {
            user  : null,
            token : '',
            error : auth.error
         }
      }
      let role: string = auth.user.role || '';
      let routesRules: any = [],
      mainRedirect: any,
      modules = [];
      let submodules = {};

      if(role == ROLE_ADMIN){
         routesRules = ROUTES_FOR_ADMIN;
         mainRedirect = ROUTE_HOME;
      }
      else if(role == ROLE_SUPER_ADMIN){
         routesRules = ROUTES_FOR_SUPER_ADMIN;
         mainRedirect = ROUTE_HOME;
      }
      else if(role == ROLE_PACIENTE){
         routesRules = ROUTES_FOR_SUPER_ADMIN;
         mainRedirect = ROUTE_HOME;
      }

      auth.user.main_redirect = mainRedirect;

      STATIC_ROUTERS.forEach( module => {
         routesRules.forEach((route: {module: string, navigators: []}) => {
            if (route.module === module.route) {
               modules.push({
                  ...module,
                  "route-navigators": route.navigators
               })
               if(module.route=="/cuenta")
               {
                  submodules={
                     "route_navigators": route.navigators
                  }
               }
            }
         })
      });

      saveLocalStorage(KEY_ARRAY_MY_MENU, modules);
      saveLocalStorage(KEY_NAVEGACION_SUB_MODULO, submodules);
      saveLocalStorage(KEY_USER_DATA, auth);
      saveLocalStorage(KEY_TOOGLE_MENU, true);
      saveLocalStorage(KEY_TOKEN_KYTE,access_token)

      if(!!login.data.token) {
         setAuthCookie(access_token, undefined);
         setAuthCookie(access_token, expire_time === 0 ? undefined: { expires: expire_time });
         currentUserSubject.next(auth);
      }
      const authResponse = {...auth, data: login.data};
      console.log(authResponse);
      return authResponse;

   } catch (e) {
      return {
         user: null, token: '', error: { code: 0, message: 'Error en obtener permisos' }
      }
   }
}

async function logout() {
   const rpta = await authenticationRepository.logout();
   if (!rpta.error) {
      end();
   }
   return rpta;
}
