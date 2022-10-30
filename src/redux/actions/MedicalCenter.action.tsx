import {
    MEDICAL_CENTER,
 } from '@constants/action-type';
 
 
 export function SelectMedicalCenter(id_medical_center: any) {
    console.log(id_medical_center);
    return {
       type: MEDICAL_CENTER,
       payload: id_medical_center
    }
 }
