
import { RegisterView as Register } from './Register';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification, SelectMedicalCenter } from '@/redux/actions';

// const mapStateToProps = (state) => ({...state})

const mapStateToProps = ({ NotificationReducer, MedicalCenterReducer }) => ({
   $store: {
      NotificationReducer,
      MedicalCenterReducer
   },
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {
         actionSetListNotification: actionSetListNotification,
         SelectMedicalCenter: SelectMedicalCenter
      },
      dispatch
   ),
});

//export default connect(mapStateToProps)(withRouter(Home));

//export const LoginView: any = connect(mapStateToProps,NotificationsAction)(withRouter(Home));

export const RegisterView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Register);
