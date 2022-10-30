import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { patientService } from "@/service/services/Patient.service";
import React, { useEffect, useState } from "react";
import { ConfirmDialog } from '@components/common/DialogConfirm';
import { PatientMasterModal } from "./PatientMasterModal";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { Button, InputAdornment,Autocomplete, TextField, Grid, CircularProgress, Snackbar, Alert, FormControl, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';

export const PatientMasterView = (props) => {
    console.log(props)
    const { MedicalCenterReducer ='' } = props;
    const [dataPatient, setDataPatient] = useState<any>([]);
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

    const getDataPatient = async()=>{
        const resp:any = await patientService.getPatientPage(MedicalCenterReducer.id_medical_center);
        console.log(resp)
        if(resp.data){
            setDataPatient(resp.data);
        }
    }


    const getPatientSearch = async(term)=>{
        const resp:any = await patientService.getPatientSearch(MedicalCenterReducer.id_medical_center, term);
        console.log(resp)
        if(resp.data){
            setDataPatient(resp.data);
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
                setDialog(prev => ({ ...prev, message:  `Seguro que quiere eliminar a ${name} ${last_name}`, id: id, medical_center: idmedical_center, open: true, confirm: true }));
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
        const { confirm, id, medical_center } = Dialog;
        try {
            if (Dialog.confirm == true) {
                const res = await patientService.deletePatient(id, medical_center)
                if (res.data) {
                    setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'info',
                        message: res.data.message,
                    }));
                    getDataPatient();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const savePatientMaster = async (data) => {
        console.log(data);
        if (data) {
            const res: any = await patientService.createPatient(data)
            if (res.data.detail) {
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: res.data.message,
                }));
                setOpen(false)
                getDataPatient();
            }
        }
    }
    const editPatientMaster = async (data) => {
        const { id } = data;
        if (data) {
            const res: any = await patientService.updatepatient(id, data)
            if (res.data.detail) {
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: res.data.message,
                }));
                setOpen(false)
                getDataPatient();
            }
        }
    }

    useEffect(()=>{
        getDataPatient();
    },[])

    useEffect(()=>{
        getDataPatient();
    },[MedicalCenterReducer.id_medical_center])

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
            <PatientMasterModal
                open={open}
                setOpen={setOpen}
                savePatientMaster={savePatientMaster}
                actionSelect={actionSelect}
                recoveryData={recoveryData}
                editPatientMaster={editPatientMaster}
            />
            <TableDataV2
                data={dataPatient}
                header={[
                    { name: 'rut', label: 'RUT', filter: false, Chip: false },
                    { name: 'name', label: 'Nombre', filter: false, Chip: false },
                    { name: 'last_name', label: 'Apellido', filter: false, Chip: false },
                    { name: 'mail', label: 'Correo', filter: false, Chip: false },
                    { name: 'status', label: 'Estado', filter: false, Chip: true }
                ]}
                status_action
                checkbox
                select_button= {props?.select_button ?true:false}
                title={'Pacientes'}
                RecuperarData={RecuperarData}
                setModalSave={setOpen}
                actionSelect={setActionSelect}
                dataInitial={getDataPatient}
                dataSearch={getPatientSearch}
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
