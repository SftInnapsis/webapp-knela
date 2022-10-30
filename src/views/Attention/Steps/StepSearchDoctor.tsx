import { Doctor } from "@/views/Doctors"

export const StepSearchDoctor = (props) => {

    const recuperarData = (data) => {
        props.handleNext();
        props.setDataDoctor(data)
    }

    return (
        <>
        <Doctor isNOtProtected recuperarData={recuperarData} select_button={true}/>
        </>
    )
}