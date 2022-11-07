import { RequestRepository } from "../repositories/Request.repository";
export const RequestService = {
    getRequest,
    createRequest,
};

async function getRequest(id, medical_center) {
    const tutor = await RequestRepository.getRequest(id, medical_center);
    return tutor;
}

async function createRequest(medical_center, idattention, idtutor, countTexts, countFiles, data) {
    const tutor = await RequestRepository.createRequest(medical_center, idattention, idtutor, countTexts, countFiles, data);
    return tutor;
}
