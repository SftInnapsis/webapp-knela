import { ubigeoRepository } from "../repositories/Ubigeo.repository";
export const ubigeoService = {
 
   getCountry,
   getDepartament,
   getProvince,
   getDistrict,
   getDistrictUbigeo
};

async function getCountry () {
   const area= await ubigeoRepository.getCountry();
   return area
}
async function getDepartament (id) {
   console.log(id)
    const area= await ubigeoRepository.getDepartament(id);
    return area
 }
 async function getProvince (id) {
    const area= await ubigeoRepository.getProvince(id);
    return area
 }
 async function getDistrict (id) {
    const area= await ubigeoRepository.getDistrict(id);
    return area
 }
 async function getDistrictUbigeo (d_district, id_province, id_department, id_country) {
   const area= await ubigeoRepository.getDistrictUbigeo(d_district, id_province, id_department, id_country);
   return area
}
