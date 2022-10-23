import axios from 'axios';

const get = async <T>(url: string, head?: any): Promise<T> => {
   const response = await axios.get(url, {
      method  : 'GET',
      headers : head,
   })
   const rpta: T = await response.data
   return rpta
}
const getTwo = async (url: string, head?: any) => {
   const response = await axios.get(url, {
      method  : 'GET',
      responseType: 'arraybuffer',
      headers : head,
   })
   const rpta = response
   return rpta
}

const post = async <T>(url: string, body?: any, head?: any): Promise<T> => {
   const response = await axios(url, {
      method  : 'POST',
      data    : body,
      headers : head,
   })
   const rpta: T = await response.data
   return rpta
}

const patch = async <T>(url: string, body?: any, head?: any): Promise<T> => {
   const response = await axios(url, {
      method  : 'PATCH',
      data    : body,
      headers : head,
   })
   const rpta: T = await response.data
   return rpta
}

const put = async <T>(url: string, body?: any, head?: any): Promise<T> => {
   const response = await axios(url, {
      method  : 'PUT',
      params  : body,
      headers : head,
   })
   const rpta: T = await response.data
   return rpta
}

const _delete = async <T>(url: string, body?: any, head?: any): Promise<T> => {
   const response = await axios(url, {
      method  : 'DELETE',
      params  : body,
      headers : head,
   })
   const rpta: T = await response.data
   return rpta
}

export const native = {
   get,
   getTwo,
   post,
   put,
   delete: _delete,
   patch
}
