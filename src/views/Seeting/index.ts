import { SeetingView as Feature } from "./Seeting";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ periodReducer }) => ({
   $store: {
      periodReducer,
   },
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {

      },
      dispatch
   ),
});

export const SeetingView: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(Feature);
