import React, { useEffect, useRef, useState } from 'react';
import { Protected } from '@components/layout/Protected';
import { readLocalStorage } from '../toolbox/helpers/local-storage-helper';
import { KEY_TOKEN_KYTE, KEY_USER_DATA } from '../toolbox/constants/local-storage';
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { Toaster, toast } from 'react-hot-toast';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification } from '@/redux/actions';
// import { notifyService } from '@/service/services/Notify.service';
import { Props } from './KyteApp.type'
import { chatService } from '@/service/services/Chat.service';

export const KyteApp: React.FC<Props> = (props: any): JSX.Element => {

   window['Pusher'] = require('pusher-js');
   const data: any = readLocalStorage(KEY_USER_DATA) || []



   useEffect(() => {
      //  ContNotify();
      console.log(props)
      console.log(readLocalStorage(KEY_TOKEN_KYTE));
      if(data.user)
      {
         window['Echo'] = new Echo({
            broadcaster: 'pusher',
            key: 'knela2',
            wsHost: window.location.hostname,
            wsPort: 6005,
            cluster: 'mt1',
            wssPort: 6005,
            disableStats: true,
            forceTLS: false,
            enabledTransports: ['ws', 'wss'],
            authEndpoint: `${process.env.REACT_APP_API_URL}/api/broadcasting/auth`,
            auth: {
               headers: {
                  Accept: 'application/json',
                  Authorization: `${readLocalStorage(KEY_TOKEN_KYTE)}`
               }
            },
         });

         window['Echo'].channel(`messageChat${data.user.iduser_detail}`).listen('MessageChat', (e) => {
            console.log(e)
            if(e && e.message && e.message.idchats)
            {
            onListMessage(e?.message?.idchats)
            }
         })


      }
      //  console.log(data.user.idmedical_center);
      //   console.log(data);
      if (data && data.user && !data.user.idmedical_center) {
         data.user.medical_center.length > 0 && props.$action.SelectMedicalCenter(data && data.user && data.user.medical_center[0].idmedical_center);
      } else {
         props.$action.SelectMedicalCenter(data && data.user && data.user.idmedical_center);
      }
   }, [])

   const ContNotify = async () => {
      // const resNotify = await notifyService.getNotiNoVistos(5, 1)
      //   props.$action?.actionSetListNotification(resNotify.data?.cantidad)
   }
   const onListMessage = async (idChat) =>{
      if(idChat)
      {
       const res:any = await chatService.getDetailMessage(idChat);
       console.log(res)
       if(res && res.data && res.data.detail)
       {
          console.log(res.data.detail)
         props.$action.getMessagetChat(res.data.detail)
         //  setMessage(res.data.detail)
       }
      }
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




