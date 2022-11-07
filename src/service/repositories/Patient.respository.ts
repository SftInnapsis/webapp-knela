import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER } from '@/toolbox/constants/local-storage';


export const patientRepository = {

   getPatientPage: async (perPage=null, page=null, idarea=null, medical_center=null): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients?medical_center=${medical_centerr}` )
      const {data,error,message} = patient
      return {
         data,
         error,
         message
      };
   },
   getPatientPageAll: async (): Promise<any> => {
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients` )
      const {data,error,message} = patient
      return {
         data,
         error,
         message
      };
   },
   getPatientSearch: async (perPage=null, page=null, idarea=null, medical_center=null, term): Promise<any> => {
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients?medical_center=${medical_center}&term=${term}` )
      const {data,error,message} = patient
      return {
         data,
         error,
         message
      };
   },
   getPatientSearchAll: async (term): Promise<any> => {
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients?term=${term}` )
      const {data,error,message} = patient
      return {
         data,
         error,
         message
      };
   },
//    getPatientSearchPage: async (perPage=null, page=null, medical_center, idarea=null, term): Promise<any> => {
//     const patient = await http.get<any>(`${API_URL_BASE}/v1/patients?term=${term}&status=1&medical_center=${medical_center}&
//     idarea=${idarea}per_page=${perPage}&page=${page}` )
//     const {data,error,message} = patient
//     return {
//        data,
//        error,
//        message
//     };
//  },
   createPatient: async (datapatient) : Promise<any> => {

      const resp= await http.post<any>(`${API_URL_BASE}/v1/patients`, {
        name: datapatient?.name,
        last_name: datapatient?.last_name,
        rut: datapatient?.rut,
        date_birth: datapatient?.date_birth,
        mail: datapatient?.mail,
        medical_center: datapatient?.medical_center,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updatepatient: async (id: number, datapatient) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/patients/${id}`, {
        name: datapatient?.name,
        last_name: datapatient?.last_name,
        rut: datapatient?.rut,
        date_birth: datapatient?.date_birth,
        mail: datapatient?.mail,
        medical_center: datapatient?.medical_center,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deletePatient: async (id: number, medical_center) : Promise<any> => {
      const patientDeleted = await http.delete(`${API_URL_BASE}/v1/patients/${id}`)
      return patientDeleted;
   },
   getStatusPatient:async(): Promise<any>=>{
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const statusPatient = await http.get(`${API_URL_BASE}/v1/statusPatient?medical_center=${medical_center}`)
      return statusPatient
   }

}
