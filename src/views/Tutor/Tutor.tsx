import { ConfirmDialog } from "@/components/common/DialogConfirm"
import { TableDataV2 } from "@/components/common/Tablev2"
import { Protected } from "@/components/layout/Protected"
import { tutorService } from "@/service/services/Tutor.service"
import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { ModalTutor } from "./ModalTutor"

export const TutorView = (props) => {
    const [optionsTutores, setOptionsTutores] = useState<any>([])
    const [openModal, setOpenModal] = useState<any>(false)
    const [actionSelect, setActionSelect] = useState<any>('')
    const [recoveryData, setRecoveryData] = useState<any>({})
    const [Dialog, setDialog] = useState<any>({
        open: false,
        title: 'Eliminar',
        confirm: false,
        id: null,
        medical_center: null,
        message: `¿Desea eliminar al contacto --- con Rut ----?`
    })

    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'error',
        message: 'Error',
        autoHideDuration: 3000,
    })

    const getDataTutores = async() => {
        const resp_tutores = await tutorService.geTutorByPatient(props.dataPatient.id)
        if(resp_tutores){
            setOptionsTutores(resp_tutores.data)
        }
    }

    
    const getDataTutoresSearch = async(term) => {
        const resp_tutores = await tutorService.geTutorByPatientSearch(props.dataPatient.id, term)
        if(resp_tutores){
            setOptionsTutores(resp_tutores.data)
        }
    }
    const RecuperarData = async( data) => {
        const { action, id, name, last_name } = data;
        setActionSelect(action)
        switch (action) {
            case 'edit':
                setRecoveryData(data);
                setOpenModal(true)
                break;
            case 'delete':
                setDialog(prev => ({ ...prev, message:  `Seguro que quiere eliminar a ${name} ${last_name}`, id: id, medical_center: '', open: true, confirm: true }));
                break;
            case 'seleccionar':
                console.log(data);
                props?.recuperarData(data);
                break;
            default:
                break;
        }
    }

    const Delete = async () => {
        const { id,confirm } = Dialog;
        try {
            if (Dialog.confirm == true) {
                const res = await tutorService.deleteTutor(id)
                if (res.data) {
                    setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'info',
                        message: res.data.message,
                    }));
                    getDataTutores();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveTutor = async (data) => {
        console.log(data);
        if (data) {
            const res: any = await tutorService.createTutor({...data, idpatients : props.dataPatient.id })
            if (res.data.detail) {
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: res.data.message,
                }));
                setOpenModal(false)
                getDataTutores();
            }
        }
    }
    const editTutor = async (data) => {
        const { id } = data;
        if (data) {
            const res: any = await tutorService.updateTutor(id, data)
            if (res.data.detail) {
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: res.data.message,
                }));
                setOpenModal(false)
                getDataTutores();
            }
        }
    }


    useEffect(()=>{
        getDataTutores();
    },[])



    const bodyView = <>
         <ConfirmDialog
                open={Dialog.open}
                title={Dialog.title}
                message={Dialog.message}
                onConfirm={() => Delete()}
                onClose={() => setDialog(prev => ({ ...prev, open: false }))}
            />
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
            <ModalTutor
                open={openModal}
                setOpen={setOpenModal}
                savePatientMaster={saveTutor}
                actionSelect={actionSelect}
                recoveryData={recoveryData}
                editPatientMaster={editTutor}
            />
            <TableDataV2
                data={optionsTutores}
                header={[
                    { name: 'rut', label: 'RUT', filter: false, Chip: false },
                    { name: 'name', label: 'Nombre', filter: false, Chip: false },
                    { name: 'last_name', label: 'Apellido', filter: false, Chip: false },
                    { name: 'mail', label: 'Correo', filter: false, Chip: false },
                    { name: 'status', label: 'Estado', filter: false, Chip: true }
                ]}
                status_action
                checkbox
                select_button
                title={'Tutores'}
                RecuperarData={RecuperarData}
                setModalSave={setOpenModal}
                actionSelect={setActionSelect}
                dataInitial={getDataTutores}
                dataSearch={getDataTutoresSearch}
            />
    </>

    return (
        <>
         { props?.isNOtProtected == true ?
             bodyView :<Protected>
             {bodyView}
         </Protected>
           
        }
        </>
    )
}