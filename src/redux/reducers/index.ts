import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import NotificationReducer from './Notification.reducer';
import MessageReducer from './Message.reducer';

export default combineReducers({
   userReducer,
   NotificationReducer,
   MessageReducer
});
