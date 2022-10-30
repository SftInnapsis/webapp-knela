import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';


export const ubigeoRepository = {

    getCountry: async (): Promise<any> => {
        const ubigeo = await http.get<any>(`${API_URL_BASE}/v1/country`)
        const { data, error, message } = ubigeo
        return {
            data,
            error,
            message
        };
    },
    getDepartament: async (id): Promise<any> => {
        const ubigeo = await http.get<any>(`${API_URL_BASE}/v1/department/${id}`)
        const { data, error, message } = ubigeo
        return {
            data,
            error,
            message
        };
    },
    getProvince: async (id): Promise<any> => {
        const ubigeo = await http.get<any>(`${API_URL_BASE}/v1/province/${id}`)
        const { data, error, message } = ubigeo
        return {
            data,
            error,
            message
        };
    },
    getDistrict: async (id): Promise<any> => {
        const ubigeo = await http.get<any>(`${API_URL_BASE}/v1/district/${id}`)
        const { data, error, message } = ubigeo
        return {
            data,
            error,
            message
        };
    },
    getDistrictUbigeo: async (id_district, id_province, id_department, id_country): Promise<any> => {
        const ubigeo = await http.get<any>(`${API_URL_BASE}/v1/district/dataUbigeo?id_district=${id_district}&id_province=${id_province}&id_department=${id_department}&id_country=${id_country}`)
        const { data, error, message } = ubigeo
        return {
            data,
            error,
            message
        };
    }
}
