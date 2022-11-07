import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER } from '@/toolbox/constants/local-storage';


export const professionalRepository = {

   getProfessionalPage: async (medicalCenterID, perPage = null, page = null): Promise<any> => {
      const professional = await http.get<any>(`${API_URL_BASE}/v1/professional?medical_center=${medicalCenterID}`)
      const { data, error, message } = professional
      return {
         data,
         error,
         message
      };
   },
   getProfessionalAll: async (): Promise<any> => {
      const professional = await http.get<any>(`${API_URL_BASE}/v1/professional`)
      const { data, error, message } = professional
      return {
         data,
         error,
         message
      };
   },

   getProfessionalDataInitial: async (): Promise<any> => {
      const professional = await http.get<any>(`${API_URL_BASE}/v1/professional/initial`)
      const { data, error, message } = professional
      return {
         data,
         error,
         message
      };
   },
   //    getprofessionalSearchPage: async (perPage=null, page=null, medical_center, idarea=null, term): Promise<any> => {
   //     const professional = await http.get<any>(`${API_URL_BASE}/v1/professional?term=${term}&status=1&medical_center=${medical_center}&
   //     idarea=${idarea}per_page=${perPage}&page=${page}` )
   //     const {data,error,message} = professional
   //     return {
   //        data,
   //        error,
   //        message
   //     };
   //  },
   getStaff: async (id_attention): Promise<any> => {
      const professional = await http.get<any>(`${API_URL_BASE}/v1/staff/${id_attention}`)
      const { data, error, message } = professional
      return {
         data: (data || []).map((raw) => ({
            id: raw.id,
            idprofessional: raw.idprofessional,
            area: raw.name_area,
            name: raw.professionalName,
            last_name: raw.professionalLastName
         })),
         error,
         message
      };
   },
   createStaff: async (dataStaff): Promise<any> => {
      const medicalCenter = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp = await http.post<any>(`${API_URL_BASE}/v1/staff`, {
         idattention: dataStaff?.idattention,
         idprofessional: dataStaff?.idprofessional,
         medical_center:medicalCenter
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteStaff:async (id_staff: number): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const staff = await http.delete(`${API_URL_BASE}/v1/staff/${id_staff}`,{
         medical_center: medical_center
      })
      return staff;
   },
   createProfessional: async (dataprofessional): Promise<any> => {

      const resp = await http.post<any>(`${API_URL_BASE}/v1/professional`, {
         name: dataprofessional?.name,
         last_name: dataprofessional?.last_name,
         rut: dataprofessional?.rut,
         date_birth: dataprofessional?.date_birth,
         mail: dataprofessional?.mail,
         idarea: dataprofessional?.idarea,
         medical_center: dataprofessional?.medical_center,
         idspecialty: dataprofessional?.idspecialty,
         address: dataprofessional?.address,
         iddistrict: dataprofessional?.iddistrict,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateprofessional: async (id: number, dataprofessional): Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/professional/${id}`, {
         name: dataprofessional?.name,
         last_name: dataprofessional?.last_name,
         rut: dataprofessional?.rut,
         date_birth: dataprofessional?.date_birth,
         mail: dataprofessional?.mail,
         idarea: dataprofessional?.idarea,
         medical_center: dataprofessional?.medical_center,
         idspecialty: dataprofessional?.idspecialty,
         address: dataprofessional?.address,
         iddistrict: dataprofessional?.iddistrict,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteprofessional: async (id: number, medical_center): Promise<any> => {
      const professionalDeleted = await http.delete(`${API_URL_BASE}/v1/professional/${id}?medical_center=${medical_center}`)
      return professionalDeleted;
   },

}
