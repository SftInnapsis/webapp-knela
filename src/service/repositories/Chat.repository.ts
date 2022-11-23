import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const chatRepository = {

   validateAtentiton: async (idattention, iddoctor, idprofessional, idchat_type): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp = await http.get<any>(`${API_URL_BASE}/v1/chats/validateAttention?medical_center=${medical_center}&idattention=${idattention}&iddoctor=${iddoctor}&idprofessional=${idprofessional}&idchat_type=${idchat_type}`)
      const { data, error, message } = resp
      return {
         data,
         error,
         message
      };
   },

   InsertParticipantAtentiton: async (idattention, iddoctor, idprofessional, idchat_type) : Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp= await http.post<any>(`${API_URL_BASE}/v1/chats/insertPartipant`, {
         medical_center: medical_center,
         idattention: idattention,
         idchat_type: idchat_type,
         iddoctor: iddoctor,
         idprofessional: idprofessional
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

   ListParticipantAtentiton: async (idattention,idchat_type): Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp = await http.get<any>(`${API_URL_BASE}/v1/chats/listParticipant?medical_center=${medical_center}&idattention=${idattention}&idchat_type=${idchat_type}`)
      const { data, error, message } = resp
      return {
         data: (data?.participants || []).map((dt)=>(
             {
               idParticipant: dt?.id,
               idchats: dt?.idchats,
               iddoctor: dt?.iddoctor,
               idprofessional: dt?.idprofessional,
               name: dt?.name_doctor ? dt?.name_doctor + ' ' + dt?.lastname_doctor : dt?.name_professional + ' ' + dt?.lastname_professional ,
               name_rol: dt?.iddoctor ? 'Equipo Médico': 'Administrativo'
            })
         ),
         error,
         message
      };
   },

   getDetailMessage:async (idChat): Promise<any> => {
      const resp = await http.get<any>(`${API_URL_BASE}/v1/detailChat/${idChat}`)
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

   validateOrCreateChatPrivate: async (idattention, id_participant_chat_receptor, id_participant_chat_emisor) : Promise<any> => {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      console.log(id_participant_chat_receptor)
      const resp= await http.post<any>(`${API_URL_BASE}/v1/chats/validateOrCreateChatPrivate`, {
         medical_center: medical_center,
         idattention: idattention,
         id_participant_chat_emisor: id_participant_chat_emisor,
         id_participant_chat_receptor: id_participant_chat_receptor,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

   createMessage: async (id_chat, data) : Promise<any> => {
      const resp= await http.post<any>(`${API_URL_BASE}/v1/detailChat/${id_chat}`, data)
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

}

