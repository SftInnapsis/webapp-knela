import {
   ACTION_SET_LIST_USER,
} from '@constants/action-type';
import { User } from '@service/models/User'

export function actionSetListUser(data: User[]) {
   return {
      type: ACTION_SET_LIST_USER,
      payload: data
   }
}
