import { TableDataV2 } from "@/components/common/Tablev2";
import { patientService } from "@/service/services/Patient.service";
import { PatientMaster } from "@/views/PatientMaster";
import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"

export const StepSearchPatient = (props) => {
    console.log(props)
    const recuperarData = (value) => {
        console.log(value)
        props.setDataPatient(value)
        props.handleNext()

    }

    return (
        <>
        <PatientMaster isNOtProtected recuperarData={recuperarData} select_button={true} />
        </>
    )
}