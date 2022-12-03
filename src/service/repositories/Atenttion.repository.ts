import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const atenttionRepository = {
//TODO PENDIENTE
   getFamilyPage: async (perPage=null, page=null): Promise<any> => {
      const family = await http.get<any>(`${API_URL_BASE}/v1/family` )
      const {data,error,message} = family
      return {
         data,
         error,
         message
      };
   },
   getAttentionAdmin: async ( ): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      console.log(medical_center)
      const family = await http.get<any>(`${API_URL_BASE}/v1/attention?medical_center=${medical_center}&status=1` )
      const {data,error,message} = family
      return {
         data,
         error,
         message
      };
   },

   getAttention: async (medical_center, idarea, iddoctor): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const user_data = readLocalStorage(KEY_USER_DATA)
      const idareaa =  user_data?.user?.idarea
      const family = await http.get<any>(`${API_URL_BASE}/v1/attention?medical_center=${medical_centerr}&idarea=${idareaa?JSON.stringify([idareaa]):[]}&status=1` )
      const {data,error,message} = family
      return {
         data,
         error,
         message
      };
   },

   getAttentionByProfessional: async(idprofessional):Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      console.log(medical_centerr)
      const attention = await http.get<any>(`${API_URL_BASE}/v1/attention?medical_center=${medical_centerr}&status=1` )
      const {data,error,message} = attention
      return {
         data,
         error,
         message
      };
   },

   getAttentionPatienByTutor: async (medical_center, idtutor): Promise<any> => {
      // const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      // const user_data = readLocalStorage(KEY_USER_DATA)
      // const idareaa =  user_data?.user?.idarea
      const family = await http.get<any>(`${API_URL_BASE}/v1/attention?medical_center=${medical_center}&idtutor=${idtutor}&status=1` )
      const {data,error,message} = family
      return {
         data,
         error,
         message
      };
   },

   getAttentionPatient: async (medical_center, idpatients): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const user_data = readLocalStorage(KEY_USER_DATA)
      console.log(user_data)
      const idareaa =  user_data?.user?.idarea
      const family = await http.get<any>(`${API_URL_BASE}/v1/attention?medical_center=${medical_centerr}&idpatients=${idpatients?JSON.stringify(idpatients):[]}&status=1` )
      const {data,error,message} = family
      return {
         data,
         error,
         message
      };
   },
   getStatusPatient: async ( medical_center ): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const family = await http.get<any>(`${API_URL_BASE}/v1/statusPatient?medical_center=${medical_centerr}` )
      const {data,error,message} = family
      //oeeoeoeo te lo tumbaste xd
      return {
         data,
         error,
         message
      };
   },
   getStatusUpdatePatient: async (idpatients, medical_center,typePublication,idattention): Promise<any> => {
      const family = await http.get<any>(`${API_URL_BASE}/v1/updatePatient?medical_center=${medical_center}&idpatients=${JSON.stringify(idpatients)}&idattention=${JSON.stringify(idattention)}&typePublication=${typePublication}&status=1`)
      const { data, error, message } = family
      //oeeoeoeo te lo tumbaste xd
      return {
         data,
         error,
         message
      };
   },
   createStatusUpdatePatient: async (data) : Promise<any> => {
      const resp= await http.post<any>(`${API_URL_BASE}/v1/updatePatient`, data)
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

   updateStatusUpdatePatient: async (id, data) : Promise<any> => {
      const resp= await http.patch<any>(`${API_URL_BASE}/v1/updatePatient/${id}`, {
        medical_center: data?.medical_center,
        idattention: data?.idattention,
        idstatus_patient: data?.idstatus_patient,
        iddoctor: data?.iddoctor,
        publication: data?.publication,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

   deleteStatusUpdatePatient: async (id: number, medical_center): Promise<any> => {
      const familyDeleted = await http.delete(`${API_URL_BASE}/v1/updatePatient/${id}?medical_center=${medical_center}`)
      return familyDeleted;
   },

   deleteAttention: async (id: number): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const res = await http.delete(`${API_URL_BASE}/v1/attention/${id}?medical_center=${medical_center}`)
      return res;
   },

   createfamily: async (datafamily) : Promise<any> => {

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
   updatefamily: async (id: number, datafamily) : Promise<any> => {
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
   deletefamily: async (id: number) : Promise<any> => {
      const familyDeleted = await http.delete(`${API_URL_BASE}/v1/family/${id}`)
      return familyDeleted;
   },
   createAttention: async(data:any) : Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const dataAttention = await http.post(`${API_URL_BASE}/v1/attention`,{
         medical_center: medical_center,
         idarea: data.idarea, // me falta
         idpatients: data.idpatients,
         iddoctor: data.iddoctor,
         idtutor: data.idtutor,
         room: 1,//mefalta
         idattention_type: 1,//data.idattention_type,
         idtypeSeguro: data.idtypeSeguro,
         observation: data.observations,
         idstatus_patient: data.idstatus_patient// me falta
      })

      return dataAttention;
   },
   getTypeAttention : async(): Promise<any> => {
      const resp_type = await http.get(`${API_URL_BASE}/v1/attentionType`);
      return resp_type
   }

}
