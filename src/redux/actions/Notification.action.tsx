// import { taskService } from '@/service/services/Task.service';
import {
   NOTIFICATIONS,
} from '@constants/action-type';

// export const NotificationsAction = () => async dispatch => {
//    const res:any = await taskService.getFeeds();
//    console.log(res)
//    //await service.listAdminNotifications(term); llamar a mi api de notificaciones
//    dispatch({
//        type: NOTIFICATIONS,
//        payload: res && res.data || []
//    })
//    return res && res.data || [];
// }

export function actionSetListNotification(data: any) {
   return {
      type: NOTIFICATIONS,
      payload: data
   }
}

// export function actiongetListNotification(data: any) {
//    console.log(data)
//    return {
//       type: NOTIFICATIONS,
//       payload: data
//    }
// }
