import { TableDataV2 } from "@/components/common/Tablev2"
import { tutorService } from "@/service/services/Tutor.service"
import { Professional } from "@/views/Professional"
import { TutorView } from "@/views/Tutor"
import { Button } from "@mui/material"
import { useEffect, useState } from "react"

export const StepSearchTeamMedical = ( props ) => {
    const recuperarData = (value) => {
        console.log(value)
        props.setDataMedicalTeam(value)
        
    }

    return (
        <>
        <Professional isNOtProtected dataMedicalTeam={props.dataMedicalTeam} recuperarData={recuperarData} select_button/>
        {/* <Button onClick={()=>{props.handleNext()}}>Siguiente</Button> */}
        </>
    )    
}