import { TableDataV2 } from "@/components/common/Tablev2"
import { Protected } from "@/components/layout/Protected";
import { attentionService } from "@/service/services/Attention.service"
import { ROUTE_ATTENTION } from "@/toolbox/constants/route-map";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { ModalAttention } from "./ModalAttention";

export const AttentionList = (props) => {
    const history = useHistory()

    const [data, setData ] = useState([]);
    const [open, setOpen] = useState(false)
    const [attentionSelected, setAttetnionSelected] = useState<any>(null)
    const [actionSelect,setActionSelect] = useState('')
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'success',
        message: 'Error',
        autoHideDuration: 5000,
     })
    const dataInitial = async() => {
        const resp = await attentionService.getAttentionAdmin();
        // console.log(resp)
         setData(resp?.data)
    }

    const dataSearch = () => {
        //consumir api de busqueda
    }

    const RecuperarData = (data) => {
        console.log(data)
        if(actionSelect == 'save'){
            history.push(ROUTE_ATTENTION)
        }
        // if(data.action== 'edit'){
        //     setOpen(true)
        //     setAttetnionSelected(data)
        // }
    }

    const saveAttention = () => {

    }

    const editAttention = () => {

    }

    // useEffect(()=>{
    //     if(actionSelect == 'save'){
    //         history.push(ROUTE_ATTENTION)
    //     }
    //     if(actionSelect == 'edit'){
    //         setOpen(true)
    //     }
    // },[actionSelect])


    useEffect(()=> {
        dataInitial()
    },[])
    return (
        <Protected>
            <Snackbar
               open={snackBarConfig.open}
               autoHideDuration={snackBarConfig.autoHideDuration}
               onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
               anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
               <Alert
                  onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
                  severity={snackBarConfig.severity}
                  variant="filled"
               >
                  {snackBarConfig.message}
               </Alert>
            </Snackbar>
           <ModalAttention
                open={open}
                setOpen={setOpen}
                saveProfessional={saveAttention}
                actionSelect={actionSelect}
                editProfessional={editAttention}
                attentionSelected = {attentionSelected}
                dataInitial = {dataInitial}
                snackBar = {snackBarConfig}
                setSnackBar = {setSnackBarConfig}
            />
          <TableDataV2
                data={data}
                header={[
                    { name: 'patientsRUT', label: 'RUT Paciente', filter: false, Chip: false, avatar: false },
                    { name: 'patientsName', label: 'Paciente', filter: false, Chip: false, avatar: false },
                    { name: 'tutorName', label: 'Tutor(a)', filter: false, Chip: false, avatar: false },
                    { name: 'attentionTypeName', label: 'Tipo de Atencion', filter: false, Chip: true, avatar: false },
                    // { name: 'doctorRUT', label: 'RUT Doctor', filter: false, Chip: true, avatar: false },
                    // { name: 'doctorName', label: 'Doctor', filter: false, Chip: true, avatar: false },
                    { name: 'nameArea', label: 'Area', filter: false, Chip: true, avatar: false },
                    { name: 'date_entry', label: 'Fecha de Ingreso', filter: false, Chip: true, avatar: false },
                    { name: 'statusPatientName', label: 'Estado', filter: false, Chip: true, avatar: false },
                ]}
                status_action
                checkbox
                title={'Mis Atenciones Medicas'}
                disabled_popover={true}
                RecuperarData={RecuperarData}
                setModalSave={setOpen}
                actionSelect={setActionSelect}
                dataInitial = {dataInitial}
                dataSearch = {dataSearch}
            />
        </Protected>
    )
}