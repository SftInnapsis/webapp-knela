import { userRepository } from "../repositories/User.repository";
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
export const userService = {
   // getUser: (idToken: string) => {
   //    return userRepository.getUser(idToken)
   // },
   getUser,
   getUserPage,
   getUserSearch,
   updateParticipationUsers,
   ResendPassword,
   recoveryPassword,
   PruebaReducer:(value) =>{
      switch (value) {
         case 1:
            return 'Aldair'
         case 2:
            return 'Lucho'
         default:
            return 'djdjd'
      }
   },
   getUsers: (search= "") => {
      return userRepository.getUsers((search=="")? "/": `?search=${search}`)
   },
   getUserDetails: (id) => {
      return userRepository.getUserDetails(id)
   },
   createUser: (dataUser) => {
      return userRepository.createUser(dataUser)
   },
   updateUser: (id, dataUser) => {
      return userRepository.updateUser(id, dataUser)
   },
   changePasswordUser: (dataUser) => {
      return userRepository.changePasswordUser(dataUser)
   },
   updateStatusUser: (id, dataUser) => {
      return userRepository.updateStatusUser(id, dataUser)
   },
   deleteUser: (id) => {
      return userRepository.deleteUser(id)
   },
   verifyUsernick: (user_nick) =>{
      return userRepository.verifyUsernick(user_nick)
   },
   verifyEmail: (email) =>{
      return userRepository.verifyEmail(email)
   },
   getUserData: () =>{
      return userRepository.getUserData();
   }
};

async function getUser () {
   const user= await userRepository.getUser();
   return user
}
async function getUserPage (perPage, page) {
   const user= await userRepository.getUserPage(perPage, page);
   return user
}
async function getUserSearch (search) {
   const user= await userRepository.getUserSearch(search);
   return user
}
async function updateParticipationUsers (participacion) {
   const user= await userRepository.updateParticipationUsers(participacion);
   return user
}

async function ResendPassword(idusuario)
{
   const user= await userRepository.ResendPassword(idusuario);
   return user
}

async function recoveryPassword(id_user, rol_type) {
   const user = await userRepository.recoveryPassword(id_user, rol_type);
   return user
}

