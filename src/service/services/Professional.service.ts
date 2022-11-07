import { professionalRepository } from "../repositories/Professional.repository";
export const professionalService = {
   getProfessionalPage,
   getProfessionalAll,
   getProfessionalDataInitial,
   createProfessional,
   updateprofessional,
   deleteprofessional,
   createStaff,
   getStaff,
   deleteStaff
};

async function getProfessionalPage (medicalCenterID) {
   const area= await professionalRepository.getProfessionalPage(medicalCenterID);
   return area
}
async function getProfessionalAll () {
   const area= await professionalRepository.getProfessionalAll();
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
 async function deleteStaff (id_staff) {
   const area = await professionalRepository.deleteStaff(id_staff);
   return area
}
 async function getStaff (id_attention) {
   const area = await professionalRepository.getStaff(id_attention);
   return area
}
 async function createStaff( dataStaff, idattention) {
   let resp=[]
   dataStaff.map(async(value) => {
      let detailStaff = {
         idattention: idattention,
         idprofessional: value?.id,
      }
      const staff = await professionalRepository.createStaff(detailStaff)
      resp.push(staff);
   })
   return resp
  
 }
