import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import {
   readLocalStorage,
   removeLocalStorage,
   saveLocalStorage
} from '@helpers/local-storage-helper';
import {
   KEY_ARRAY_MY_MENU,
   KEY_EMPRESA,
   KEY_OBJECT_MY_MENU,
   KEY_TOKEN_SOFTNET,
   KEY_TOOGLE_MENU,
   KEY_USER_DATA,
   KEY_USER_SOFTNET
} from '@constants/local-storage';
import { authenticationSoftnetRepository } from '../repositories/AuthenticationSoftnet.repository';

export const authenticationSoftnetService = {
   loginSoftnet,
};

async function loginSoftnet(username: string, password: string,rut: string) : Promise<any> {

    const login = await authenticationSoftnetRepository.loginSoftnet(username,rut,password);

   return login
   // try {
   //    const login = await authenticationSoftnetRepository.loginSoftnet(username,rut,password);
   //    if (!!login.message) {
   //       return {
   //          user  : null,
   //          token : '',
   //          message : login.message
   //       }
   //    }
   //    const access_token = `${login.token || ''}`;
   //       const auth = await authenticationSoftnetRepository.dataUser(access_token);
   //       const empresa = await authenticationSoftnetRepository.dataEmpresa(access_token);
   //    saveLocalStorage(KEY_TOKEN_SOFTNET,access_token);
   //    saveLocalStorage(KEY_USER_SOFTNET, auth);
   //    saveLocalStorage(KEY_EMPRESA,empresa);
   //    const authResponse = {...auth, data: login };
   //    return authResponse;

   // } catch (e) {
   //    return {
   //       user: null, token: '', error: { code: 0, message: 'Error en obtener permisos' }
   //    }
   // }
}


