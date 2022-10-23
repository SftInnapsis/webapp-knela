import { LoginView as Login} from './Login';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { actionSetListNotification } from '@/redux/actions';

// const mapStateToProps = (state) => ({...state})

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

//export default connect(mapStateToProps)(withRouter(Home));

//export const LoginView: any = connect(mapStateToProps,NotificationsAction)(withRouter(Home));

export const LoginView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Login);
