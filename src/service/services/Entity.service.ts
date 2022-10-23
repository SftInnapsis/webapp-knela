import { entityRepository } from "../repositories/Entity.repository";

export const entityService= {
   verifyRut,
   verifyEmail,
   verifyRazonSocial,
   createEntity,
   getEntity,
   getEntityUsers,
   getDataInitial,
   deleteEntity,
   updateEntity,
   dataEmpresaSoftnet,
   getVendedor,
   getSupervisor
};
function getEntityUsers(idempresacliente){
   return entityRepository.getEntityUsers(idempresacliente)
}
function getEntity(){
   return entityRepository.getEntity()
}
function verifyRut(rut_empresa){
   return entityRepository.verifyRut(rut_empresa)
}
function verifyEmail(email_cto){
   return entityRepository.verifyEmail(email_cto)
}
function verifyRazonSocial(nombre_rz){
   return entityRepository.verifyRazonSocial(nombre_rz)
}
function createEntity(entity){
   return entityRepository.createEntity(entity)
}
async function getDataInitial () {
   return entityRepository.getDataInitial();
}
async function deleteEntity (id) {
   return entityRepository.deleteEntity(id);
}
async function updateEntity (id, dataEntity) {
   return entityRepository.updateEntity(id, dataEntity);
}
async function dataEmpresaSoftnet (token,rut) {
   return entityRepository.dataEmpresaSoftnet(token,rut);
}
async function getVendedor () {
   return entityRepository.getVendedor();
}
async function getSupervisor () {
   return entityRepository.getSupervisor();
}
