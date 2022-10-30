import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';


export const familyRepository = {

   getFamilyPage: async (perPage=null, page=null): Promise<any> => {
      const family = await http.get<any>(`${API_URL_BASE}/v1/family` )
      const {data,error,message} = family
      return {
         data,
         error,
         message
      };
   },
//    getfamilySearchPage: async (perPage=null, page=null, medical_center, idarea=null, term): Promise<any> => {
//     const family = await http.get<any>(`${API_URL_BASE}/v1/family?term=${term}&status=1&medical_center=${medical_center}&
//     idarea=${idarea}per_page=${perPage}&page=${page}` )
//     const {data,error,message} = family
//     return {
//        data,
//        error,
//        message
//     };
//  },
   createFamily: async (datafamily) : Promise<any> => {

      const resp= await http.post<any>(`${API_URL_BASE}/v1/family`, {
        name: datafamily?.name,
        last_name: datafamily?.last_name,
        rut: datafamily?.rut,
        mail: datafamily?.mail,
        idpatients: datafamily?.idpatients,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateFamily: async (id: number, datafamily) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/family/${id}`, {
        name: datafamily?.name,
        last_name: datafamily?.last_name,
        rut: datafamily?.rut,
        mail: datafamily?.mail,
        idpatients: datafamily?.idpatients,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteFamily: async (id: number) : Promise<any> => {
      const familyDeleted = await http.delete(`${API_URL_BASE}/v1/family/${id}`)
      return familyDeleted;
   },

}
