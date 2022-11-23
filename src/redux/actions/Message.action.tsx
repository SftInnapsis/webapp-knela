// import { taskService } from '@/service/services/Task.service';
// import {} from '@/service/services/User.service';
import { userService } from '@service/services/User.service';
import {
    MESSAGE_CHAT,
 } from '@constants/action-type';

 // export const MESSAGE_CHATAction = () => async dispatch => {
 //    const res:any = await taskService.getFeeds();
 //    console.log(res)
 //    //await service.listAdminNotifications(term); llamar a mi api de notificaciones
 //    dispatch({
 //        type: NOTIFICATIONS,
 //        payload: res && res.data || []
 //    })
 //    return res && res.data || [];
 // }

 export function getMessagetChat(data: any) {
    return {
       type: MESSAGE_CHAT,
       payload: data
    }
 }
