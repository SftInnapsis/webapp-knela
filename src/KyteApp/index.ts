import { KyteApp as Kyte} from './KyteApp';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification, SelectMedicalCenter } from '@/redux/actions';


const mapStateToProps = ({ NotificationReducer, MedicalCenterReducer}) => ({
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


export const KyteApp: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Kyte);

