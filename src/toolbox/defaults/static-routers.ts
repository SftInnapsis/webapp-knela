import {
   ROUTE_HOME,
   ROUTE_PERFIL,
   ROUTE_ENTITY,
   ROUTE_USER,
   ROUTE_ACCOUNT,
   //ROUTE_USERS,
} from "../constants/route-map";

export const STATIC_ROUTERS = [
    {
      "name": "Inicio",
      "icon": "EvaluateIcon",
      "moduloId": 1,
      "route": ROUTE_HOME,
      "isMenu": true,
      "route-navigators": [
      ],
    },
   //  {
   //    "name": "Configuración",
   //    "icon": "SettingIcon",
   //    "moduloId": 4,
   //    "route": ROUTE_SEETING,
   //    "isMenu": true,
   //    "route-navigators": [
   //    //   ROUTE_SEETING_REGISTER_PERIOD
   //    ],
   //    "subMenu": [
   //      {
   //        "name": "Configuración",
   //        "icon": "SettingIcon",
   //        "page": {
   //          "compare": null,
   //          "displayName": "Connect(Component)"
   //        },
   //        "isMenu": true,
   //        "route": ROUTE_SEETING,
   //        "actions": {
   //          "actionInsert": true,
   //          "actionUpdate": true,
   //          "actionDelete": true,
   //          "actionSearch": true
   //        }
   //      }
   //    ]
   //  },
   //  {
   //    "name": "Vistas Contactos",
   //    "icon": "ViewUserIcon",
   //    "moduloId": 5,
   //    "route": ROUTE_CONTACT,
   //    "isMenu": true,
   //    "route-navigators": [

   //    ],
   //    "subMenu": [
   //       {
   //          "name": "Evaluación",
   //          "icon": "ViewUserIcon",
   //          "page": {
   //             "compare": null,
   //             "displayName": "Connect(Component)"
   //          },
   //          "isMenu": true,
   //          "route": ROUTE_CAMPAIGN,
   //          "actions": {
   //             "actionInsert": true,
   //             "actionUpdate": true,
   //             "actionDelete": true,
   //             "actionSearch": true
   //          }
   //       }
   //    ]
   // },
]
