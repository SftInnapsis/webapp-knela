import { SpecialityRepository } from "../repositories/Speciality.repository";
export const SpecialityService = {
 
   getSpecialtyPage,
   getDataSpecialityByMedicalCenter,
   createSpecility,
   updateSpecility,
   deleteSpecility
};

async function getSpecialtyPage () {
   const area= await SpecialityRepository.getSpecialtyPage(null, null);
   return area
}
async function getDataSpecialityByMedicalCenter (medical_center) {
   const area= await SpecialityRepository.getDataSpecialityByMedicalCenter(null, null,medical_center);
   return area
}
async function createSpecility (dataArea) {
    const area= await SpecialityRepository.createSpecility(dataArea);
    return area
 }
 async function updateSpecility (id: number, dataArea) {
    const area= await SpecialityRepository.updateSpecility(id, dataArea);
    return area
 }
 async function deleteSpecility (id: number) {
    const area= await SpecialityRepository.deleteSpecility(id);
    return area
 }
