import { doctorRepository } from "../repositories/Doctor.repository";
export const doctorService = {

   getDoctorPage,
   getDoctorDataInitial,
   getDoctorType,
   getDoctorSearchPage,
   getDoctorIndependientePage,
   createDoctor,
   createDoctorExcel,
   updateDoctor,
   deleteDoctor,
   createDoctorIndependiente,
   aceptOrDeniedDoctorIndependent
};

async function getDoctorPage(perPage = null, page = null, medical_center, idarea = null) {
   const doctor = await doctorRepository.getDoctorPage(perPage = null, page = null, medical_center, idarea = null);
   return doctor
}
async function getDoctorIndependientePage(){
   const doctor= await doctorRepository.getDoctorIndependientePage();
   console.log(doctor)
   return doctor
}
async function getDoctorDataInitial() {
   const doctor = await doctorRepository.getDoctorDataInitial();
   return doctor
}
async function getDoctorType() {
   const doctor = await doctorRepository.getDoctorType();
   return doctor
}
async function getDoctorSearchPage(perPage = null, page = null, medical_center, idarea = null, term) {
   const doctor = await doctorRepository.getDoctorSearchPage(perPage = null, page = null, medical_center, idarea = null, term);
   return doctor
}
async function createDoctor(dataDoctor) {
   const doctor = await doctorRepository.createDoctor(dataDoctor);
   return doctor
}

async function createDoctorExcel(dataDoctorExcel) {
   const doctor = await doctorRepository.createDoctorExcel(dataDoctorExcel);
   return doctor
}

async function createDoctorIndependiente(dataDoctor) {
   const doctor = await doctorRepository.createDoctorIndependiente(dataDoctor);
   //Crear Fordata
   // const upFile = await doctorRepository.upFile(dataDoctor);
   return doctor
}



async function updateDoctor(id: number, dataDoctor) {
   const doctor = await doctorRepository.updateDoctor(id, dataDoctor);
   return doctor
}
async function aceptOrDeniedDoctorIndependent(id: number, status) {
   const doctor = await doctorRepository.aceptOrDeniedDoctorIndependent(id, status);
   return doctor
}
async function deleteDoctor(id: number, medical_center) {
   const doctor = await doctorRepository.deleteDoctor(id, medical_center);
   return doctor
}
