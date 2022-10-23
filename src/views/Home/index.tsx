import { HomeView as Home} from './Home';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification, getMessagetChat } from '@/redux/actions';


const mapStateToProps = ({ NotificationReducer, MessageReducer}) => ({
   // $store: {
      NotificationReducer,
      MessageReducer,
   // },
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {
         actionSetListNotification: actionSetListNotification,
         getMessagetChat:getMessagetChat
      },
      dispatch
   ),
});

export const HomeView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Home);
