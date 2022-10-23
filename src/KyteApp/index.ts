import { KyteApp as Kyte} from './KyteApp';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification } from '@/redux/actions';


const mapStateToProps = ({ NotificationReducer }) => ({
   $store: {
      NotificationReducer,
   },
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {
         actionSetListNotification: actionSetListNotification
      },
      dispatch
   ),
});


export const KyteApp: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Kyte);

