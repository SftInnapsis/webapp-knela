import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const areaRepository = {

   getAreaPage: async (perPage=null, page=null): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const area = await http.get<any>(`${API_URL_BASE}/v1/area` )
    //   ?per_page=${perPage}&page=${page}` )
      const {data,error,message} = area
      return {
         data,
         error,
         message
      };
   },
   getDataAreaByMedicalCenter: async (perPage=null, page=null, medical_center): Promise<any> => {
      console.log(readLocalStorage(KEY_USER_DATA))
      const medical_centere = readLocalStorage(KEY_MEDICAL_CENTER)
      console.log(medical_centere)
      const area = await http.get<any>(`${API_URL_BASE}/v1/area?medical_center=${medical_centere}` )
    //   ?per_page=${perPage}&page=${page}` )
      const {data,error,message} = area
      return {
         data,
         error,
         message
      };
   },
//    getUserSearch: async (search: string): Promise<any> => {
//       const dataUser = readLocalStorage(KEY_USER_DATA);
   
//       const id_empresa = dataUser?.user?.idempresacliente;
//       const id_usuario = dataUser?.user?.idusuario;
//       const user = await http.get<any>(`${API_URL_BASE}/v1/area?search=${search}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}` )
//       const {data,error,message} = user
//       return {
//          data,
//          error,
//          message
//       };
//    },
   createArea: async (dataArea) : Promise<any> => {
      const medical_centere = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp= await http.post<any>(`${API_URL_BASE}/v1/area`, {
         name: dataArea.name,
         medical_center: medical_centere
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateArea: async (id: number, dataArea) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/area/${id}`, {
        name: dataArea.name,
        medical_center: dataArea.idmedical_center
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteArea: async (id: number) : Promise<any> => {
      const areaDeleted = await http.delete(`${API_URL_BASE}/v1/area/${id}`)
      return areaDeleted;
   },

}

