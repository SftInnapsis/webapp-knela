import { LoginView as Login } from './Login';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification, SelectMedicalCenter, getMessagetChat } from '@/redux/actions';

// const mapStateToProps = (state) => ({...state})

const mapStateToProps = ({ NotificationReducer, MedicalCenterReducer,MessageReducer }) => ({
   $store: {
      NotificationReducer,
      MedicalCenterReducer,
      MessageReducer
   },
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {
         actionSetListNotification: actionSetListNotification,
         SelectMedicalCenter: SelectMedicalCenter,
         getMessagetChat: getMessagetChat
      },
      dispatch
   ),
});

//export default connect(mapStateToProps)(withRouter(Home));

//export const LoginView: any = connect(mapStateToProps,NotificationsAction)(withRouter(Home));

export const LoginView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Login);
