import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import { professionalService } from "@/service/services/Professional.service";
import React, { useEffect, useState } from "react";
import { ConfirmDialog } from '@components/common/DialogConfirm';
import { ModalView } from '@components/common/Modal';
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { Button, InputAdornment, Autocomplete, TextField, Grid, CircularProgress, Snackbar, Alert, FormControl, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';
import { ProfessionalModal } from "./ProfessionalModal";
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_ADMIN } from "@/toolbox/defaults/static-roles";


export const ProfessionalView = (props) => {
    const { MedicalCenterReducer ='' } = props;
    const [dataProfessional, setDataProfessional] = useState<any>([]);
    const [medicalTeamSelected, setMedicalTeamSelected] = useState<any>([])
    const [open, setOpen] = useState<boolean>(false);
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

    const getDataProfessional = async () => {
        const user_data = readLocalStorage(KEY_USER_DATA);
        if(user_data.user.role == ROLE_ADMIN){
            const id_medical = MedicalCenterReducer.id_medical_center || readLocalStorage(KEY_MEDICAL_CENTER)
            const resp: any = await professionalService.getProfessionalPage( id_medical);
            console.log(resp)
            if (resp.data) {
                setDataProfessional(resp.data);
            }
        }else{
            const resp:any = await professionalService.getProfessionalAll();
            if(resp.data){
                setDataProfessional(resp.data)
            }
        }
        
    }

    const RecuperarData = async (data) => {
        const { action, id, idmedical_center, name, last_name } = data;
        setActionSelect(action)
        switch (action) {
            case 'edit':
                setRecoveryData(data);
                setOpen(true)
                break;
            case 'delete':
                setDialog(prev => ({ ...prev, message: `Seguro que quiere eliminar a ${name} ${last_name}`, id: id, medical_center: idmedical_center, open: true, confirm: true }));
                break;
            case 'seleccionar':
                console.log(data);
                let injectData = medicalTeamSelected;
                injectData.push(data);
                break;
            default:
                break;
        }
    }

    const Delete = async () => {
        const { confirm, id, medical_center } = Dialog;
        try {
            if (confirm == true) {
                const res = await professionalService.deleteprofessional(id, medical_center)
                if (res.data) {
                    setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'info',
                        message: res.data.message,
                    }));
                    getDataProfessional();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveProfessional = async (data) => {
        console.log(data);
        if (data) {
            const res: any = await professionalService.createProfessional(data)
            if (res?.data?.detail) {
                //res.data.message
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: res.data.message,
                }));
                setOpen(false)
                getDataProfessional();
            }
        }
    }
    const editProfessional = async (data) => {
        const { id } = data;
        if (data) {
            const res: any = await professionalService.updateprofessional(id, data)
            if (res.data.detail) {
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: res.data.message,
                }));
                setOpen(false)
                getDataProfessional();
            }
        }
    }

    // useEffect(() => {
    //     const user_data = readLocalStorage(KEY_USER_DATA)
    //     if(user_data?.user?.role === ROLE_ADMIN){
    //         getDataProfessionalAll();
    //     }
       
    // }, [])

    useEffect(() => {
            getDataProfessional();
       
    }, [ MedicalCenterReducer.id_medical_center])

    const bodyView = 
    <>
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
            <ProfessionalModal
                open={open}
                setOpen={setOpen}
                saveProfessional={saveProfessional}
                actionSelect={actionSelect}
                recoveryData={recoveryData}
                editProfessional={editProfessional}
            />
            <TableDataV2
                data={dataProfessional}
                header={[
                    { name: 'rut', label: 'RUT', filter: false },
                    { name: 'name', label: 'Nombre', filter: false, Chip: false },
                    { name: 'last_name', label: 'Apellido', filter: false, Chip: false },
                    { name: 'mail', label: 'Correo', filter: false, Chip: false },
                    { name: 'name_medical_center', label: 'Centro Médico', filter: false, Chip: false },
                    { name: 'area', label: 'Area', filter: false, Chip: false },
                    { name: 'specialty', label: 'Especialidad', filter: false, Chip: false },
                    { name: 'status', label: 'Status', filter: false, Chip: true },
                ]}
                status_action
                checkbox
                title={'Profesionales'}
                RecuperarData={RecuperarData}
                setModalSave={setOpen}
                actionSelect={setActionSelect}
                select_button= {props?.select_button ?true:false}
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
    );
};
