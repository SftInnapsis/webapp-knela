import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER } from '@/toolbox/constants/local-storage';


export const tutorRepository = {

   geTutorPage: async (perPage=null, page=null): Promise<any> => {
      const tutor = await http.get<any>(`${API_URL_BASE}/v1/tutor` )
      const {data,error,message} = tutor
      return {
         data,
         error,
         message
      };
   },
   geTutorByPatient: async (id): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const tutor = await http.get<any>(`${API_URL_BASE}/v1/tutor/getByPatient/${id}?medical_center=${medical_center}` )
      const {data,error,message} = tutor
      return {
         data,
         error,
         message
      };
   },
   geTutorByPatientSearch: async (id,term): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const tutor = await http.get<any>(`${API_URL_BASE}/v1/tutor/getByPatient/${id}?medical_center=${medical_center}&term=${term}` )
      const {data,error,message} = tutor
      return {
         data,
         error,
         message
      };
   },
//    gettutorSearchPage: async (perPage=null, page=null, medical_center, idarea=null, term): Promise<any> => {
//     const tutor = await http.get<any>(`${API_URL_BASE}/v1/tutor?term=${term}&status=1&medical_center=${medical_center}&
//     idarea=${idarea}per_page=${perPage}&page=${page}` )
//     const {data,error,message} = tutor
//     return {
//        data,
//        error,
//        message
//     };
//  },
   createTutor: async (dataTutor) : Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp= await http.post<any>(`${API_URL_BASE}/v1/tutor`, {
        name: dataTutor?.name,
        last_name: dataTutor?.last_name,
        rut: dataTutor?.rut,
        date_birth: dataTutor?.date_birth,
        mail: dataTutor?.mail,
        idpatients: dataTutor?.idpatients,
        medical_center: medical_center
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateTutor: async (id: number, dataTutor) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/tutor/${id}`, {
        name: dataTutor?.name,
        last_name: dataTutor?.last_name,
        rut: dataTutor?.rut,
        date_birth: dataTutor?.date_birth,
        mail: dataTutor?.mail,
        idpatients: dataTutor?.idpatients,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteTutor: async (id: number) : Promise<any> => {
      const tutorDeleted = await http.delete(`${API_URL_BASE}/v1/tutor/${id}`)
      return tutorDeleted;
   },

}
