import { familyRepository } from "../repositories/Family.repository";
export const familyService = {
 
   getFamilyPage,
   createFamily,
   updateFamily,
   deleteFamily
};

async function getFamilyPage () {
   const family= await familyRepository.getFamilyPage();
   return family
}
async function createFamily (dataFamily) {
    const family= await familyRepository.createFamily(dataFamily);
    return family
 }
 async function updateFamily (id: number, dataFamily) {
    const family= await familyRepository.updateFamily(id, dataFamily);
    return family
 }
 async function deleteFamily (id: number) {
    const family= await familyRepository.deleteFamily(id);
    return family
 }
