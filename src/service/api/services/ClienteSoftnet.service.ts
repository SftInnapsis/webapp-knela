import { ClienteSoftnetRepository } from "../repositories/ClienteSoftnet.repository";

export const ClienteSoftnetService = {
   getCliente,
};

function getCliente(token) {
   return ClienteSoftnetRepository.getCliente(token);
}


