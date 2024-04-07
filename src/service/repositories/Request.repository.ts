import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';


export const RequestRepository = {

    getRequest: async (id, medical_center): Promise<any> => {
        const resp = await http.get<any>(`${API_URL_BASE}/v1/requestUpdate/${id}?medical_center=${medical_center}`)
        const { data, error, message } = resp
        return {
            data,
            error,
            message
        };
    },

    createRequest: async (medical_center, idattention, idtutor, idpatients, countTexts, countFiles, data): Promise<any> => {
        const medical_centere = readLocalStorage(KEY_MEDICAL_CENTER)
        const resp = await http.post<any>(`${API_URL_BASE}/v1/requestUpdate?medical_center=${medical_center}&idattention=${idattention}&idtutor=${idtutor}&idpatients=${idpatients}&countTexts=${countTexts}&countFiles=${countFiles}`,data)
        return {
            status: resp.status,
            message: resp.message,
            data: resp.data
        };
    },

}

