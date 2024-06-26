import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER } from '@/toolbox/constants/local-storage';


export const patientRepository = {

   getPatientPage: async (perPage=null, page=null, idarea=null, medical_center=null): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients?medical_center=${medical_centerr}` )
      const {data,error,message} = patient
      console.log(data)
      return {
         // data,
         data : (data||[]).map((dt) => ({
            id: dt.id,
            idTypeSeguro: dt.idTypeSeguro,
            date_birth: dt.date_birth,
            idmedical_center: dt.idmedical_center,
            name: dt.name,
            last_name: dt.last_name,
            full_name: dt.name + ' ' +  dt.last_name,
            mail: dt.mail,
            medicalCenter_name: dt.medicalCenter_name,
            medicalCenter_rut: dt.medicalCenter_rut,
            nameTypeSeguro: dt.nameTypeSeguro,
            rut: dt.rut,
            status: dt.status,
            tutor_id:dt.tutor_id,
            tutor_last_name: dt.tutor_last_name,
            tutor_name: dt.tutor_name,
            tutor_mail: dt.tutor_mail,
            full_name_tutor: dt.tutor_name ? dt.tutor_name + ' ' + dt.tutor_last_name: '',
            tutor_rut: dt.tutor_rut
         })),
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
   getPatientAmbulatorioPageAll: async (id_medical_center,rut_doctorInd): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients/for_doc_ind?medical_center=${id_medical_center}&rut_doctorInd=${rut_doctorInd}` )
      const {data,error,message} = patient
      console.log(data)
      return {
         // data,
         data : (data||[]).map((dt) => ({
            id: dt.id,
            idTypeSeguro: dt.idTypeSeguro,
            date_birth: dt.date_birth,
            idmedical_center: dt.idmedical_center,
            name: dt.name,
            last_name: dt.last_name,
            full_name: dt.name + ' ' +  dt.last_name,
            mail: dt.mail,
            medicalCenter_name: dt.medicalCenter_name,
            medicalCenter_rut: dt.medicalCenter_rut,
            nameTypeSeguro: dt.nameTypeSeguro,
            rut: dt.rut,
            status: dt.status,
            tutor_id:dt.tutor_id,
            tutor_last_name: dt.tutor_last_name,
            tutor_name: dt.tutor_name,
            tutor_mail: dt.tutor_mail,
            full_name_tutor: dt.tutor_name ? dt.tutor_name + ' ' + dt.tutor_last_name: '',
            tutor_rut: dt.tutor_rut
         })),
         error,
         message
      };
   },
   getPatientAmbulatorioSearch: async (id_medical_center,rut_doctorInd, term): Promise<any> => {
      const medical_centerr = readLocalStorage(KEY_MEDICAL_CENTER)
      const patient = await http.get<any>(`${API_URL_BASE}/v1/patients/for_doc_ind?medical_center=${id_medical_center}&rut_doctorInd=${rut_doctorInd}&term=${term}` )
      const {data,error,message} = patient
      console.log(data)
      return {
         // data,
         data : (data||[]).map((dt) => ({
            id: dt.id,
            idTypeSeguro: dt.idTypeSeguro,
            date_birth: dt.date_birth,
            idmedical_center: dt.idmedical_center,
            name: dt.name,
            last_name: dt.last_name,
            full_name: dt.name + ' ' +  dt.last_name,
            mail: dt.mail,
            medicalCenter_name: dt.medicalCenter_name,
            medicalCenter_rut: dt.medicalCenter_rut,
            nameTypeSeguro: dt.nameTypeSeguro,
            rut: dt.rut,
            status: dt.status,
            tutor_id:dt.tutor_id,
            tutor_last_name: dt.tutor_last_name,
            tutor_name: dt.tutor_name,
            tutor_mail: dt.tutor_mail,
            full_name_tutor: dt.tutor_name ? dt.tutor_name + ' ' + dt.tutor_last_name: '',
            tutor_rut: dt.tutor_rut
         })),
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
        idarea: datapatient?.idarea,
        date_birth: datapatient?.date_birth,
        mail: datapatient?.mail,
        medical_center: datapatient?.medical_center,
        observation: datapatient?.observation,
        nameTypeSeguro: datapatient?.nameTypeSeguro,
        idTypeSeguro: datapatient?.idTypeSeguro,
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   createPatientExcel: async (dataExcel) : Promise<any> => {
      const resp= await http.post<any>(`${API_URL_BASE}/v1/patients/load-excel`, dataExcel)
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
   },

    createDoctorExcel: async (dataExcel) : Promise<any> => {

      const resp= await http.post<any>(`${API_URL_BASE}/v1/doctor/load-excel`, dataExcel)
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },

}
