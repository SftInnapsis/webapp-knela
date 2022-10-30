import { tutorRepository } from "../repositories/Tutor.repository";
export const tutorService = {
 
   geTutorPage,
   geTutorByPatient,
   createTutor,
   updateTutor,
   deleteTutor,geTutorByPatientSearch
};

async function geTutorPage () {
   const tutor= await tutorRepository.geTutorPage();
   return tutor
}
async function geTutorByPatient (id) {
   const tutor= await tutorRepository.geTutorByPatient(id);
   return tutor
}
async function geTutorByPatientSearch (id,term) {
   const tutor= await tutorRepository.geTutorByPatientSearch(id,term);
   return tutor
}
async function createTutor (dataTutor) {
    const tutor= await tutorRepository.createTutor(dataTutor);
    return tutor
 }
 async function updateTutor (id: number, dataTutor) {
    const tutor= await tutorRepository.updateTutor(id, dataTutor);
    return tutor
 }
 async function deleteTutor (id: number) {
    const tutor= await tutorRepository.deleteTutor(id);
    return tutor
 }
