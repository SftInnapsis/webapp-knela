import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const medicalCenterRepository = {

   getMedicalCenterPage: async (perPage=null, page=null): Promise<any> => {
      const user_data = readLocalStorage(KEY_USER_DATA)
      const id_type_user = user_data.user.iduser_type
      const medicalCenter = await http.get<any>(`${API_URL_BASE}/v1/medicalCenter?type_user=${id_type_user}` )
    //   ?per_page=${perPage}&page=${page}` )
      const {data,error,message} = medicalCenter
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
//       const user = await http.get<any>(`${API_URL_BASE}/v1/medicalCenter?search=${search}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}` )
//       const {data,error,message} = user
//       return {
//          data,
//          error,
//          message
//       };
//    },
   createMedicalCenter: async (dataMedicalCenter) : Promise<any> => {
      const user_data = readLocalStorage(KEY_USER_DATA)
      const id_type_user = user_data.user.iduser_type
      const resp= await http.post<any>(`${API_URL_BASE}/v1/medicalCenter?type_user=${id_type_user}`, {
         rut: dataMedicalCenter.rut,
         name: dataMedicalCenter.name,
         mail: dataMedicalCenter.mail,
         email: dataMedicalCenter.email_admin,
         idattention_type: dataMedicalCenter.idattention_type,
         address: dataMedicalCenter.address,
         iddistrict: dataMedicalCenter.iddistrict,
         phone: dataMedicalCenter.phone
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   updateMedicalCenter: async (id: number, dataMedicalCenter) : Promise<any> => {
      const user_data = readLocalStorage(KEY_USER_DATA)
      const resp = await http.post<any>(`${API_URL_BASE}/v1/medicalCenter/${id}`, {
        rut: dataMedicalCenter?.rut,
        name: dataMedicalCenter?.name,
        mail: dataMedicalCenter?.mail,
        idattention_type: dataMedicalCenter?.idattention_type,
        address: dataMedicalCenter?.address,
        iddistrict: dataMedicalCenter?.iddistrict,
        phone: dataMedicalCenter?.phone,
        type_user: user_data?.user?.iduser_type
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteMedicalCenter: async (id: number) : Promise<any> => {
      const medicalCenterDeleted = await http.delete(`${API_URL_BASE}/v1/medicalCenter/${id}`)
      return medicalCenterDeleted;
   },

}
