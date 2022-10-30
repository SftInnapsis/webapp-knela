import { TableDataV2 } from "@/components/common/Tablev2"
import { tutorService } from "@/service/services/Tutor.service"
import { TutorView } from "@/views/Tutor"
import { useEffect, useState } from "react"

export const StepSearchTutor = ( props ) => {
    const recuperarData = (value) => {
        console.log(value)
         props.setDataTutor(value)
         props.handleNext()
    }

    return (
        <>
        <TutorView isNOtProtected recuperarData={recuperarData} dataPatient={props.dataPatient}/>
        </>
    )    
}