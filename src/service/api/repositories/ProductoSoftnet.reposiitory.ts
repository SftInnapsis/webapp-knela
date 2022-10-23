import {  API_URL_SOFTNET } from '@/toolbox/defaults/app';

export const ProductoSoftnetRepository = {
   getProducto,
}


function getProducto(token) {
   return fetch(`${API_URL_SOFTNET}/producto`, {
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


