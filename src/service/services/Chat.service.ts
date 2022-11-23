import { chatRepository } from "../repositories/Chat.repository";
export const chatService = {
   validateAtentiton,
   InsertParticipantAtentiton,
   ListParticipantAtentiton,
   validateOrCreateChatPrivate,
   getDetailMessage,
   createMessage
};

async function validateAtentiton (idattention, iddoctor, idprofessional, idchat_type) {
   const resp= await chatRepository.validateAtentiton(idattention, iddoctor, idprofessional, idchat_type);
   return resp;
}

async function InsertParticipantAtentiton (idattention, iddoctor, idprofessional, idchat_type) {
   const resp= await chatRepository.InsertParticipantAtentiton(idattention, iddoctor, idprofessional, idchat_type);
   return resp;
}

async function ListParticipantAtentiton (idattention) {
   const resp= await chatRepository.ListParticipantAtentiton(idattention, 1);
   return resp;
}

async function getDetailMessage (idChat) {
    const resp= await chatRepository.getDetailMessage(idChat);
    return resp;
 }

 async function validateOrCreateChatPrivate (idattention, id_participant_chat_receptor, id_participant_chat_emisor) {
    const resp= await chatRepository.validateOrCreateChatPrivate(idattention, id_participant_chat_receptor, id_participant_chat_emisor);
    return resp;
 }

 async function createMessage(idChat, data) {
   const resp= await chatRepository.createMessage(idChat, data);
   return resp;
}
