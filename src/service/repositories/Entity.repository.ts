import { http } from '../http/http';
import { API_URL_BASE, API_URL_SOFTNET } from '@toolbox/defaults/app';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';

export const entityRepository = {

   getEntity: async (): Promise<any>=> {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const entity = await http.get<any>(`${API_URL_BASE}/v1/entity?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`)
      const { data, error, message } = entity;
      return {
         data,
         error,
         message
      }
   },
   getEntityUsers: async (idempresacliente): Promise<any>=> {
      console.log(idempresacliente)
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const entity = await http.get<any>(`${API_URL_BASE}/v1/entity/users?idempresacliente=${idempresacliente}&rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`)
      const { data, error, message } = entity;
      return {
         data,
         error,
         message
      }
   },
   verifyRut: async (rut_empresa:string) : Promise<any> => {
      const resp = await http.post<any>(`${API_URL_BASE}/v1/entity/verify-rut`, {
         rut_empresa: rut_empresa
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      }
   },
   verifyEmail: async (email_cto:string) : Promise<any> => {
      const resp = await http.post<any>(`${API_URL_BASE}/v1/entity/verify-email`, {
         email_cto: email_cto
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      }
   },
   verifyRazonSocial: async (nombre_rz:string) : Promise<any> => {
      const resp = await http.post<any>(`${API_URL_BASE}/v1/entity/verify-razon-social`, {
         nombre_rz: nombre_rz
      })
      return {
         status: resp.status,
         message: resp.message,
         data: resp.data
      }
   },
   createEntity: async (dataEntity): Promise<any>=> {

      const resp = await http.post<any>(`${API_URL_BASE}/v1/entity`, {
         rut_empresa: dataEntity.rut_empresa,
         idtiporubro: dataEntity.idtiporubro,
         propietario: dataEntity.propietario,
         nombre_rz: dataEntity.nombre_rz,
         nombre_fantasia: dataEntity.nombre_fantasia,
         giro: dataEntity.giro,
         telefono: dataEntity.telefono,
         fax: dataEntity.fax,
         prospecto: dataEntity.prospecto,
         observacion: dataEntity.observacion,
         extranjero: dataEntity.extranjero,
         web: dataEntity.web,
         direccion: dataEntity.direccion,
         idcomuna: dataEntity.idcomuna,
         nombre_cto: dataEntity.nombre_cto,
         cargo_cto: dataEntity.cargo_cto,
         email_cto: dataEntity.email_cto,
         telefono_cto: dataEntity.telefono_cto,
         celular_cto: dataEntity.celular_cto,
         cobranza_cto: dataEntity.cobranza_cto,
         idtipousuario: dataEntity.idtipousuario,
         user_nombre: dataEntity.nombre,
         user_nick: dataEntity.user_nick,
         user_email: dataEntity.email_admin,
         user_password: dataEntity.password,
         user_telefono: dataEntity.user_telefono
      })
      return {
        // error: resp.error,
         status: resp.status,
         message: resp.message,
         data: resp.data
      };
   },
   getDataInitial: async (): Promise<any>=> {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const response = await http.get<any>(`${API_URL_BASE}/v1/entity/data?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`);
      const { data, error, message } = response;
      return{
         data,
         error,
         message
      }
   },
   deleteEntity: async (id: number) : Promise<any> => {
      const entityDeleted = await http.delete(`${API_URL_BASE}/v1/entity/${id}`)
      return entityDeleted;
   },
   updateEntity: async (id: number, dataEntity): Promise<any> => {
      console.log(id);
      const resp = await http.patch<any>(`${API_URL_BASE}/v1/entity/${id}`, {
         rut_empresa: dataEntity.rut_empresa,
         idtiporubro: dataEntity.idtiporubro,
         propietario: dataEntity.propietario,
         nombre_rz: dataEntity.nombre_rz,
         nombre_fantasia: dataEntity.nombre_fantasia,
         giro: dataEntity.giro,
         telefono: dataEntity.telefono,
         fax: dataEntity.fax,
         prospecto: dataEntity.prospecto,
         observacion: dataEntity.observacion,
         extranjero: dataEntity.extranjero,
         web: dataEntity.web,
         direccion: dataEntity.direccion,
         idcomuna: dataEntity.idcomuna,
         nombre_cto: dataEntity.nombre_cto,
         cargo_cto: dataEntity.cargo_cto,
         email_cto: dataEntity.email_cto,
         telefono_cto: dataEntity.telefono_cto,
         celular_cto: dataEntity.celular_cto,
         cobranza_cto: dataEntity.cobranza_cto,
         idtipousuario: dataEntity.idtipousuario,
         user_nombre: dataEntity.nombre,
         user_nick: dataEntity.user_nick,
         user_email: dataEntity.email_admin,
         user_telefono: dataEntity.user_telefono
      });
      return resp;
   },
   getVendedor: async () : Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const resp = await http.get(`${API_URL_BASE}/v1/entity/vendedor?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`)
      return resp;
   },
   getSupervisor: async () : Promise<any> => {
      const dataUser = readLocalStorage(KEY_USER_DATA);
      const rut_empresa = dataUser?.user?.rut_empresa;
      const id_empresa = dataUser?.user?.idempresacliente;
      const id_usuario = dataUser?.user?.idusuario;
      const resp = await http.get(`${API_URL_BASE}/v1/entity/supervisor?rut_empresa=${rut_empresa}&id_empresa=${id_empresa}&id_usuario=${id_usuario}`)
      return resp;
   },
   dataEmpresaSoftnet
}

function dataEmpresaSoftnet(token,rut){
   return fetch(`${API_URL_SOFTNET}/cliente/${rut}   `, {
     method: 'GET',
     headers: {
       'Access-Control-Allow-Origin':'*',
       'Content-Type': 'application/x-www-form-urlencoded',
       token: token,
     },
   })
     .then(datosEmpresa => datosEmpresa.json())
     .then(datosEmpresa => {
      console.log('datosEmpresa',datosEmpresa);
       return datosEmpresa;
     })
     .catch(error => {
       return false;
     })
 }

