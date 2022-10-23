import {  API_URL_SOFTNET } from '@/toolbox/defaults/app';

export const ClienteSoftnetRepository = {
   getCliente,
}

 function getCliente(token) {
   return fetch(`${API_URL_SOFTNET}/cliente`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(bod => bod.json())
     .then(bod => {
       return bod;
     })
     .catch(error => {
       return null;
     })
 }



