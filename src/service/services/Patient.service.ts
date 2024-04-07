import { patientRepository } from "../repositories/Patient.respository";
export const patientService = {

   getPatientPage,
   getPatientPageAll,
   getPatientSearchAll,
   createPatient,
   createPatientExcel,
   updatepatient,
   getStatusPatient,
   deletePatient,
   getPatientSearch,
   getPatientAmbulatorioPageAll,
   getPatientAmbulatorioSearch
};

async function getPatientPage (medical_center) {
   const area= await patientRepository.getPatientPage(null, null, null, medical_center);
   return area
}
async function getPatientPageAll() {
   const area= await patientRepository.getPatientPageAll();
   return area
}
async function getPatientSearch (medical_center, term) {
   const area= await patientRepository.getPatientSearch(null, null, null, medical_center, term);
   return area
}
async function getPatientSearchAll(term) {
   const area= await patientRepository.getPatientSearchAll(term);
   return area
}
async function createPatient (dataArea) {
    const area= await patientRepository.createPatient(dataArea);
    return area
 }
 async function createPatientExcel(dataDoctorExcel) {
   const doctor = await patientRepository.createPatientExcel(dataDoctorExcel);
   return doctor
}
 async function updatepatient (id: number, dataArea) {
    const area= await patientRepository.updatepatient(id, dataArea);
    return area
 }
 async function deletePatient (id: number,medical_center) {
    const area= await patientRepository.deletePatient(id, medical_center);
    return area
 }
 async function getStatusPatient(){
   const status = await patientRepository.getStatusPatient();
   return status
 }
 async function getPatientAmbulatorioPageAll(id_medical_center,rut_doctorInd){
   const status = await patientRepository.getPatientAmbulatorioPageAll(id_medical_center,rut_doctorInd);
   return status
 }
 async function getPatientAmbulatorioSearch(id_medical_center,rut_doctorInd, term){
   const status = await patientRepository.getPatientAmbulatorioSearch(id_medical_center,rut_doctorInd, term);
   return status
 }



