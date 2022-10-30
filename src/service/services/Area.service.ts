import { areaRepository } from "../repositories/Area.repository";
export const areaService = {
 
   getAreaPage,
   createArea,
   updateArea,
   deleteArea,
   getDataAreaByMedicalCenter
};

async function getAreaPage () {
   const area= await areaRepository.getAreaPage(null, null);
   return area
}
async function getDataAreaByMedicalCenter (medical_center) {
   const area= await areaRepository.getDataAreaByMedicalCenter(null, null,medical_center);
   return area
}
async function createArea (dataArea) {
    const area= await areaRepository.createArea(dataArea);
    return area
 }
 async function updateArea (id: number, dataArea) {
    const area= await areaRepository.updateArea(id, dataArea);
    return area
 }
 async function deleteArea (id: number) {
    const area= await areaRepository.deleteArea(id);
    return area
 }
