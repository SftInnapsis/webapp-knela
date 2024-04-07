import {HomeDoctorIndependienteView} from './HomeDoctorIndependiente'
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

export const HomeDoctorIndependiente: any = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(HomeDoctorIndependienteView);
