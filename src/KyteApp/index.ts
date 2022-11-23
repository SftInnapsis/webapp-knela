import { KyteApp as Kyte} from './KyteApp';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification, SelectMedicalCenter,getMessagetChat } from '@/redux/actions';


const mapStateToProps = ({ NotificationReducer, MedicalCenterReducer, MessageReducer}) => ({
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


export const KyteApp: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Kyte);

