import { HomeView as Home } from './Home';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification, getMessagetChat, SelectMedicalCenter } from '@/redux/actions';


const mapStateToProps = ({ NotificationReducer, MessageReducer, MedicalCenterReducer }) => ({
   // $store: {
   NotificationReducer,
   MessageReducer,
   MedicalCenterReducer
   // },
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {
         actionSetListNotification: actionSetListNotification,
         getMessagetChat: getMessagetChat,
         SelectMedicalCenter: SelectMedicalCenter
      },
      dispatch
   ),
});

export const HomeView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Home);
