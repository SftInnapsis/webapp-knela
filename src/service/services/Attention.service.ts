import { atenttionRepository } from "../repositories/Atenttion.repository";
export const attentionService = {

   getAreaPage,
   getAttention,
   getAttentionPatient,
   createStatusUpdatePatient,
   getStatusUpdatePatient,
   createAttention,
   getTypeAttention,
   getAttentionAdmin,
   getStatusPatient,
   updateStatusUpdatePatient,
   deleteStatusUpdatePatient,
   getAttentionPatienByTutor,
   getAttentionByProfessional
   //    createArea,
   //    updateArea,
   //    deleteArea
};

async function getAreaPage() {
   const user = await atenttionRepository.getFamilyPage();
   return user
}

async function getAttention(medical_center, idarea, iddoctor) {
   const user = await atenttionRepository.getAttention(medical_center, idarea, iddoctor);
   return user
}
async function getAttentionByProfessional(idprofessional) {
   const user = await atenttionRepository.getAttentionByProfessional(idprofessional);
   return user
}

async function getAttentionPatienByTutor(medical_center, idtutor) {
   const user = await atenttionRepository.getAttentionPatienByTutor(medical_center,idtutor);
   return user
}

async function getAttentionAdmin() {
   const user = await atenttionRepository.getAttentionAdmin();
   return user
}
async function getAttentionPatient(medical_center, idtutor) {
   const user = await atenttionRepository.getAttentionPatient(medical_center, idtutor);
   return user
}
async function getStatusUpdatePatient(id, medical_center,typePublication,idattention) {
   const user = await atenttionRepository.getStatusUpdatePatient(id, medical_center,typePublication,idattention);
   return user
}
async function getStatusPatient(medical_center) {
   const user = await atenttionRepository.getStatusPatient(medical_center);
   return user
}
async function createStatusUpdatePatient(dataArea) {
   const user = await atenttionRepository.createStatusUpdatePatient(dataArea);
   return user
}
async function updateStatusUpdatePatient(id, dataArea) {
   const user = await atenttionRepository.updateStatusUpdatePatient(id, dataArea);
   return user
}
async function deleteStatusUpdatePatient(id, medical_center) {
   const user = await atenttionRepository.deleteStatusUpdatePatient(id, medical_center);
   return user
}
async function createAttention(data) {
   const resp_attention = await atenttionRepository.createAttention(data);
   return resp_attention
}
async function getTypeAttention() {
   const resp_type_attention = await atenttionRepository.getTypeAttention();
   return resp_type_attention
}
// async function createArea (dataArea) {
//     const user= await atenttionRepository.createArea(dataArea);
//     return user
//  }
//  async function updateArea (id: number, dataArea) {
//     const user= await atenttionRepository.updateArea(id, dataArea);
//     return user
//  }
//  async function deleteArea (id: number) {
//     const user= await atenttionRepository.deleteArea(id);
//     return user
//  }
