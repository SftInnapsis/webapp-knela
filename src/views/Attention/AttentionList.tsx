import { ConfirmDialog } from "@/components/common/DialogConfirm";
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
     const [Dialog, setDialog] = useState<any>({
      open: false,
      title: 'Eliminar',
      confirm: false,
      id: null,
      message: `¿Desea eliminar al contacto --- con Rut ----?`
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
        const {id} = data
        if(actionSelect == 'save'){
            history.push(ROUTE_ATTENTION)
        }
        if(data.action== 'delete'){
         setDialog(prev => ({ ...prev, message: `Seguro que quiere eliminar la atención`, id: id, medical_center: '', open: true, confirm: true }));
        }

    }

    const Delete = async () => {
      const { confirm, id } = Dialog;
      try {
          if (confirm == true) {
              const res = await attentionService.deleteAttention(id)
              console.log(res)
              if (res.data) {
                  setSnackBarConfig(prev => ({
                      ...prev,
                      open: true,
                      severity: 'info',
                      message: res.data.message,
                  }));
                  dataInitial();
              }
          }
      } catch (e) {
          // console.log(e)
      }
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
          <ConfirmDialog
             open={Dialog.open}
             title={Dialog.title}
             message={Dialog.message}
             onConfirm={() => Delete()}
             onClose={() => setDialog(prev => ({ ...prev, open: false }))}
          />
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
                disabled_popover={false}
                disabled_edit = {true}
                RecuperarData={RecuperarData}
                setModalSave={setOpen}
                actionSelect={setActionSelect}
                dataInitial = {dataInitial}
                dataSearch = {dataSearch}
            />

        </Protected>
    )
}
