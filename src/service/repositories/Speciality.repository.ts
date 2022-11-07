import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const SpecialityRepository = {

   getSpecialtyPage: async (perPage=null, page=null): Promise<any> => {
      const specialty = await http.get<any>(`${API_URL_BASE}/v1/specialty` )
    //   ?per_page=${perPage}&page=${page}` )
      const {data,error,message} = specialty
      return {
         data,
         error,
         message
      };
   },
   getDataSpecialityByMedicalCenter: async (perPage=null, page=null, medical_center): Promise<any> => {
      console.log(readLocalStorage(KEY_USER_DATA))
      const medical_centere = readLocalStorage(KEY_MEDICAL_CENTER)
      console.log(medical_centere)
      const speciality = await http.get<any>(`${API_URL_BASE}/v1/specialty?medical_center=${medical_centere}` )
    //   ?per_page=${perPage}&page=${page}` )
      const {data,error,message} = speciality
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
   createSpecility: async (dataSpeciality) : Promise<any> => {
      const medical_centere = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp= await http.post<any>(`${API_URL_BASE}/v1/specialty`, {
         name: dataSpeciality.name,
         medical_center: medical_centere
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateSpecility: async (id: number, dataSpeciality) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/specialty/${id}`, {
        name: dataSpeciality.name,
        medical_center: dataSpeciality.idmedical_center
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteSpecility: async (id: number) : Promise<any> => {
      const areaDeleted = await http.delete(`${API_URL_BASE}/v1/specialty/${id}`)
      return areaDeleted;
   },

}

