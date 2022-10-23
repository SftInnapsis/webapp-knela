import { HeaderView as Header} from './Header';
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


export const HeaderView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Header);
