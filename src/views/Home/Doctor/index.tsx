import {HomeDoctorView} from './HomeDoctor'
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

export const HomeDoctor: any = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HomeDoctorView);