import { http } from '../http/http';
import { API_URL_BASE } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';

export const notifyRepository = {
   getNotify: async (): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const notify = await http.get<any>(`${API_URL_BASE}/v1/recordatorio?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}` )
      const {pagination,recordatorio} = notify
      return {
            pagination,
            recordatorio
      };
   },
   getNotiNoVistos: async (perPage,page): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const notify = await http.get<any>(`${API_URL_BASE}/v1/notificaciones?per_page=${perPage}&page=${page}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}` )
      return notify;
   },

   editVisto: async (id): Promise<any> => {
      const notify = await http.patch<any>(`${API_URL_BASE}/v1/notificaciones/visto/${id}`,{})
      return notify;
   },

   getViewSent: async (idusuario:number): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const viewSent = await http.get<any>(`${API_URL_BASE}/v1/recordatorio/viewsent?idusuario=${idusuario}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`)
      const {pagination,recordatorio} = viewSent
      return {
         pagination,
         recordatorio
      };
   },
   getViewReceived: async (idusuario:number): Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const viewReceived = await http.get<any>(`${API_URL_BASE}/v1/recordatorio/viewreceived?idusuario=${idusuario}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}` )
      const {pagination,recordatorio} = viewReceived
      return {
         pagination,
         recordatorio
      };
   },

   createNotiy: async (notify): Promise<any>=> {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const resp = await http.post<any>(`${API_URL_BASE}/v1/recordatorio/sendreminder?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`, {
         idfromreminder: notify.fromusuario,
         idtoreminder: notify.usuario,
         reminderdatetime: notify.fecha,
         remindertitle: notify.titulo,
         reminderdescription: notify.descripcion,
         reminderrute:notify.ruta,
      })
      return {
        // error: resp.error,

        resp
         // status: resp.status,
         // message: resp.message,
         // data: resp.data
      };
   },
}
