import { http } from '../http/http';
import { API_URL_BASE, ID_AMBULATORIO } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER } from '@/toolbox/constants/local-storage';


export const doctorRepository = {

   getDoctorPage: async (perPage=null, page=null, medical_center, idarea=null): Promise<any> => {
      const id_medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const doctor = await http.get<any>(`${API_URL_BASE}/v1/doctor?status=1&medical_center=${id_medical_center}&per_page=${perPage}&page=${page}` )
      const {data,error,message} = doctor
      return {
         data,
         error,
         message
      };
   },
   getDoctorIndependientePage: async (): Promise<any> => {
      // const id_medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const doctorIndependiente = await http.get<any>(`${API_URL_BASE}/v1/userValidation?medical_center=${ID_AMBULATORIO}` )
      const {data,error,message} = doctorIndependiente
      return {
         data: (data||[]).map((value)=>({
            address: value.address,
            curriculum: value.curriculum,
            date_birth: value.date_birth,
            dni: value.dni,
            front_photo: value.front_photo,
            id: value.id,
            iddoctor: value.iddoctor,
            iduser: value.iduser,
            job_tittle: value.job_tittle,
            last_name: value.last_name,
            name_all : value.name+' '+value.last_name,
            mail: value.mail,
            name: value.name,
            observations: value.observations,
            rut: value.rut,
            side_photo: value.side_photo,
            specialty: value.specialty,
            status: value.status,
            status_validation: value.status_validation,
            status_validation_name: value.status_validation == "0"? "Pendiente":  value.status_validation == "1"? "Aceptado": "Rechazado",
            userRut: value.userRut
       })),
         error,
         message
      };
   },
   getDoctorDataInitial: async (): Promise<any> => {
      const professional = await http.get<any>(`${API_URL_BASE}/v1/doctor/initial`)
      const { data, error, message } = professional
      return {
         data,
         error,
         message
      };
   },
   getDoctorType: async (): Promise<any> => {
      const doctor = await http.get<any>(`${API_URL_BASE}/v1/doctortype` )
      const {data,error,message} = doctor
      return {
         data,
         error,
         message
      };
   },
   getDoctorSearchPage: async (perPage=null, page=null, medical_center, idarea=null, term): Promise<any> => {
      // &idarea=${idarea}&per_page=${perPage}&page=${page}
    const doctor = await http.get<any>(`${API_URL_BASE}/v1/doctor?term=${term}&status=1&medical_center=${medical_center}` )
    const {data,error,message} = doctor
    return {
       data,
       error,
       message
    };
 },
   createDoctor: async (datadoctor) : Promise<any> => {

      const resp= await http.post<any>(`${API_URL_BASE}/v1/doctor`, {
        name: datadoctor?.name,
        last_name: datadoctor?.last_name,
        rut: datadoctor?.rut,
        date_birth: datadoctor?.date_birth,
        mail: datadoctor?.mail,
        idarea: datadoctor?.idarea,
        idspecialty: datadoctor?.idspecialty,
        iddoctor_type: 1,
        address: datadoctor?.address,
        iddistrict: datadoctor?.iddistrict,
        type_rol: datadoctor?.type_rol,
        name_rol: datadoctor?.name_rol,
        medical_center: readLocalStorage(KEY_MEDICAL_CENTER)
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

   createDoctorExcel: async (dataExcel) : Promise<any> => {
      const resp= await http.post<any>(`${API_URL_BASE}/v1/doctor/load-excel`, dataExcel)
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },


   createDoctorIndependiente: async (datadoctor) : Promise<any> => {
      // const { name, last_name, rut, date_birth, mail, address } = datadoctor;
      const resp= await http.post<any>(`${API_URL_BASE}/v1/doctor/createIndepent`,datadoctor)
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },


   upFile: async (data) : Promise<any> => {
      const resp= await http.post<any>(`${API_URL_BASE}/v1/doctor/createIndepent`, data)
      return resp;
   },


   updateDoctor: async (id: number, datadoctor) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/doctor/${id}`, {
        name: datadoctor?.name,
        last_name: datadoctor?.last_name,
        rut: datadoctor?.rut,
        date_birth: datadoctor?.date_birth,
        mail: datadoctor?.mail,
        idarea: datadoctor?.idarea,
        idspecialty: datadoctor?.idspecialty,
        iddoctor_type: datadoctor?.iddoctor_type,
        address: datadoctor?.address,
        iddistrict: datadoctor?.iddistrict,
        medical_center: datadoctor?.medical_center,
        type_rol: datadoctor?.type_rol,
        name_rol: datadoctor?.name_rol,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   aceptOrDeniedDoctorIndependent: async (id: number, statusDoc) : Promise<any> => {
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/doctor/changeStatusIndepent/${id}`, {
        status: statusDoc
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   deleteDoctor: async (id: number, medical_center) : Promise<any> => {
      const doctorDeleted = await http.delete(`${API_URL_BASE}/v1/doctor/${id}`,{
        medical_center: medical_center
      })
      return doctorDeleted;
   },

}
