import React, { useEffect, useRef, useState } from 'react';
import { Protected } from '@components/layout/Protected';
import { readLocalStorage } from '../toolbox/helpers/local-storage-helper';
import { KEY_TOKEN_KYTE, KEY_USER_DATA } from '../toolbox/constants/local-storage';
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import {Toaster, toast} from 'react-hot-toast';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification } from '@/redux/actions';
// import { notifyService } from '@/service/services/Notify.service';
import { Props } from './KyteApp.type'

export const KyteApp: React.FC<Props> = (props:any): JSX.Element => {

   window['Pusher'] = require('pusher-js');
   const data: any = readLocalStorage(KEY_USER_DATA) ||[]
useEffect(() => {
   //  ContNotify();
   // if(data.user)
   // {
   //    window['Echo'] = new Echo({
   //       broadcaster: 'pusher',
   //       key: 'crm_key',
   //       wsHost: window.location.hostname,
   //       wsPort: 6002,
   //       cluster: 'mt1',
   //       wssPort: 6002,
   //       disableStats: true,
   //       forceTLS: false,
   //       enabledTransports: ['ws','wss'],
   //       authEndpoint: `${process.env.REACT_APP_API_URL}/api/broadcasting/auth`,
   //       auth: {
   //           headers: {
   //               Accept: 'application/json',
   //               Authorization: `${ readLocalStorage(KEY_TOKEN_KYTE)}`
   //           }
   //       },
   //   });

   // //   window['Echo'].private(`contador${data.user.idusuario}`).listen('CountNotification', (e) => {
   // //    //   alert('holasss')

   // //    toast.success(e.count,{ duration: 5000})
   // // })
 

   // }
},[])

const ContNotify = async () => {
   // const resNotify = await notifyService.getNotiNoVistos(5, 1)
//   props.$action?.actionSetListNotification(resNotify.data?.cantidad)
}

   return (
      <>
         <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
               style:
               {
                  background: '#c9c7c7',
                  color: '#fff'
               }
            }}
         />
      </>
   )
};




