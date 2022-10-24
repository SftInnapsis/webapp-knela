import {
   ROUTE_HOME,
   ROUTE_ACCOUNT,
   ROUTE_USER_CREATE,
   ROUTE_PERFIL,
   ROUTE_ENTITY,
   ROUTE_USER,
   ROUTE_CONFIGURACION,
   ROUTE_USER_UPDATE,
   ROUTE_ENTITY_CREATE,
   ROUTE_ENTITY_UPDATE,
   ROUTE_ENTITY_USERS
} from "../constants/route-map";

export const ROLE_SUPER_ADMIN = 'ADMIN';
export const ROLE_ADMIN = 'ADMIN CENTRO MEDICO';
export const ROLE_DOCTOR_IND = 'DOCTOR INDEPENDIENTE';
export const ROLE_DOCTOR = 'DOCTOR';
export const ROLE_PACIENTE = 'PACIENTE';
export const ROLE_TUTOR = 'TUTOR';
export const ROLE_FAMILIAR = 'FAMILIAR';
export const ROLE_TRABAJADOR = 'TRABAJADOR';
export const ROLE_ADMIN_PROYECCION = 'ADMIN_PROYECCION';

export const ROUTES_FOR_SUPER_ADMIN = [
   {
      module: ROUTE_ENTITY,
      navigators: []
   },
   {
      module: ROUTE_ACCOUNT,
      navigators: [ROUTE_PERFIL]
   },
]
export const ROUTES_FOR_TRABAJADOR = [
   {
      module: ROUTE_ACCOUNT,
      navigators: [ROUTE_PERFIL]
   }
]

export const ROUTES_FOR_ADMIN = [
   {
      module: ROUTE_HOME,
      navigators: []
   },
   {
      module: ROUTE_USER,
     navigators: []
   },
   {
      module: ROUTE_ACCOUNT,
      navigators: [
         ROUTE_PERFIL,
         ROUTE_USER,
         ROUTE_CONFIGURACION]
   },
   {
      module: ROUTE_CONFIGURACION,
      navigators: []
   }
]
export const ROUTES_FOR_VENDEDOR = [
   {
      module: ROUTE_HOME,
      navigators: []
   },
   {
      module: ROUTE_ACCOUNT,
      navigators: [ROUTE_PERFIL]
   }
]
export const ROUTES_FOR_SUPERVISOR = [
   {
      module: ROUTE_HOME,
      navigators: []
   },
   {
      module: ROUTE_USER,
     navigators: []
   }
]

export const MAIN_REDIRECT_FOR_SUPER_ADMIN = ROUTE_HOME;
export const MAIN_REDIRECT_FOR_ADMIN       = ROUTE_HOME;

