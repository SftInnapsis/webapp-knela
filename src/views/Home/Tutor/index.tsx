import {HomeTutorView} from './HomeTutor'
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { SelectMedicalCenter } from '@/redux/actions';

const mapStateToProps = ({ MedicalCenterReducer }) => ({
    // $store: {
    MedicalCenterReducer,
    // },
});
const mapDispatchToProps = (dispatch) => ({
    $action: bindActionCreators(
        {
            SelectMedicalCenter: SelectMedicalCenter
        },
        dispatch
    ),
});

export const HomeTutor: any = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HomeTutorView);