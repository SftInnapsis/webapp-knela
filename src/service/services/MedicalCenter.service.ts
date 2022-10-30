import { medicalCenterRepository } from "../repositories/MedicalCenter.repository";
export const medicalCenterService = {
 
   getMedicalCenterPage,
   createMedicalCenter,
   updateMedicalCenter,
   deleteMedicalCenter
};

async function getMedicalCenterPage () {
   const area= await medicalCenterRepository.getMedicalCenterPage();
   return area
}
async function createMedicalCenter (dataMedicalCenter) {
    const area= await medicalCenterRepository.createMedicalCenter(dataMedicalCenter);
    return area
 }
 async function updateMedicalCenter (id: number, dataArea) {
    const area= await medicalCenterRepository.updateMedicalCenter(id, dataArea);
    return area
 }
 async function deleteMedicalCenter (id: number) {
    const area= await medicalCenterRepository.deleteMedicalCenter(id);
    return area
 }
