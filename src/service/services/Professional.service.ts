import { professionalRepository } from "../repositories/Professional.repository";
export const professionalService = {
   getProfessionalPage,
   getProfessionalDataInitial,
   createProfessional,
   updateprofessional,
   deleteprofessional
};

async function getProfessionalPage (medicalCenterID) {
   const area= await professionalRepository.getProfessionalPage(medicalCenterID);
   return area
}
async function getProfessionalDataInitial () {
   const area= await professionalRepository.getProfessionalDataInitial();
   return area
}
async function createProfessional (dataArea) {
    const area= await professionalRepository.createProfessional(dataArea);
    return area
 }
 async function updateprofessional (id: number, dataArea) {
    const area= await professionalRepository.updateprofessional(id, dataArea);
    return area
 }
 async function deleteprofessional (id: number,medical_center) {
    const area = await professionalRepository.deleteprofessional(id, medical_center);
    return area
 }
