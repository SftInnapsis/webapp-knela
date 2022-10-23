import { native } from './cn/axios';
import { authenticationService } from '../services/Authentication.service'
const headers = {
   'Content-Type': 'application/json',
   // 'Accept': 'application/json',
}

const get = async <T>(url: string ): Promise<T> => {
   try {
      return await native.get<T>(url, headers)
   } catch (e) {
      return handleError(e)
   }
}
const getTwo = async (url: string) => {
   try {
      return await native.getTwo(url, headers)
   } catch (e) {
      return handleError(e)
   }
}

const post = async <T>(url: string, body?: any): Promise<T> => {
   try {
      return await native.post<T>(url, body, headers)
   } catch (e) {
      return handleError(e)
   }
}

const patch = async <T>(url: string, body?: any): Promise<T> => {
   try {
      return await native.patch<T>(url, body, headers)
   } catch (e) {
      return handleError(e)
   }
}

const put = async <T>(url: string, body?: any): Promise<T> => {
   return await native.put<T>(url, body, headers)
}

const _delete = async <T>(url: string, body?: any): Promise<T> => {
   return await native.delete<T>(url, body, headers)
}

const handleError = async (e: any) => {
   let isGeneralError = false;
   if (!!e.response) {
      if (!!e.response.data) {
         if (e.response.data.constructor === Object) {
               isGeneralError = false
         } else { isGeneralError = true }
      } else { isGeneralError = true }
   } else { isGeneralError = true }

   if (!!e.response) {
      if (e.response.status === 401) {
         const status = {
            code    : 401,
            message : 'Sesión expirada'
         }
         setTimeout(() => {
            authenticationService.end();
            window.location.href= "/login";
         }, 1000);
         return {
            message : 'Usuario no autorizado',
            status  : status,
            error   : status
         }
      }
   }

   if (isGeneralError) {
      const status = {
         code    : 500,
         message : 'Problemas al conectarse al servidor'
      }
      return {
         message : 'Error',
         status  : status,
         error   : status
      }
   } else {
      const data = e.response.data
      data.error = data.status
      return data;
   }
}

export const http = {
   get,
   getTwo,
   post,
   put,
   delete: _delete,
   patch,
   ERROR_500_CODE: 500,
   ERROR_500_TEXT: 'gaaa'
}
