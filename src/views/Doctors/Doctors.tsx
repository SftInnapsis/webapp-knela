import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import React, { useEffect, useState } from "react";
import { ConfirmDialog } from '@components/common/DialogConfirm';
import { DoctorModal } from "./DoctorModal";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { Button, InputAdornment, Autocomplete, TextField, Grid, CircularProgress, Snackbar, Alert, FormControl, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';

export const DoctorView = (props) => {
    const { MedicalCenterReducer = '' } = props;
    const [dataDoctor, setDataDoctor] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [actionSelect, setActionSelect] = useState<any>('')
    const [recoveryData, setRecoveryData] = useState<any>({})
    const [Dialog, setDialog] = useState<any>({
        open: false,
        title: 'Eliminar',
        confirm: false,
        id: null,
        message: `¿Desea eliminar al contacto --- con Rut ----?`
    })

    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'error',
        message: 'Error',
        autoHideDuration: 3000,
    })

    const getDataDoctor = async () => {
        const resp: any = await doctorService.getDoctorPage(
            null, null, MedicalCenterReducer.id_medical_center, null
        );
        console.log(resp)
        if (resp.data) {
            setDataDoctor(resp.data);
        }
    }

    const getDoctorSearchPage = async (term)=>{
        const resp: any = await doctorService.getDoctorSearchPage(
            null, null, MedicalCenterReducer.id_medical_center, null, term
        );
        console.log(resp)
        if (resp.data) {
            setDataDoctor(resp.data);
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
                props?.recuperarData(data);
                break;
            default:
                break;
        }
    }

    const Delete = async () => {
        const { confirm, id, medical_center } = Dialog;
        try {
            if (confirm == true) {
                const res = await doctorService.deleteDoctor(id, medical_center)
                if (res.data) {
                    setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'info',
                        message: res.data.message,
                    }));
                    getDataDoctor();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveDoctor = async (data) => {
        console.log(data);
        if (data) {
            const res: any = await doctorService.createDoctor(data)
            if (res.data) {
                //res.data.message
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: 'Doctor creado correctamente'
                }));
                setOpen(false)
                getDataDoctor();
            }
        }
    }
    const editDoctor = async (data) => {
        const { id } = data;
        if (data) {
            const res: any = await doctorService.updateDoctor(id, data)
            if (res.data) {
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    severity: 'info',
                    message: 'Doctor editado correctamente'
                }));
                setOpen(false)
                getDataDoctor();
            }
        }
    }

    // useEffect(()=>{
    //     getDataDoctor();
    // },[props?.isNOtProtected])

    useEffect(() => {
        getDataDoctor();
    }, [MedicalCenterReducer.id_medical_center])

    const bodyView = <>
        <ConfirmDialog
            open={Dialog.open}
            title={Dialog.title}
            message={Dialog.message}
            onConfirm={() => Delete()}
            onClose={() => setDialog(prev => ({ ...prev, open: false }))}
        />
        <DoctorModal
            open={open}
            setOpen={setOpen}
            saveDoctor={saveDoctor}
            actionSelect={actionSelect}
            recoveryData={recoveryData}
            editDoctor={editDoctor}
        />
        <TableDataV2
            data={dataDoctor}
            header={[
                { name: 'rut', label: 'RUT', filter: false, Chip: false },
                { name: 'name', label: 'Nombre', filter: false, Chip: false },
                { name: 'last_name', label: 'Apellido', filter: false, Chip: false },
                { name: 'date_birth', label: 'Fecha de Nacimiento', filter: false, Chip: false },
                { name: 'mail', label: 'Correo', filter: false, Chip: false },
                { name: 'specialtyName', label: 'Especialidad', filter: false, Chip: true },
                { name: 'doctorTypeName', label: 'Tipo ', filter: false, Chip: true },
                { name: 'areaName', label: 'Area', filter: false, Chip: true },
                { name: 'districtName', label: 'Distrito', filter: false, Chip: true },
                { name: 'address', label: 'Direccion', filter: false, Chip: true },
                { name: 'status', label: 'Estado', filter: false, Chip: true },
            ]}
            status_action
            checkbox
            select_button= {props?.select_button ?true:false}
            title={'Doctores'}
            RecuperarData={RecuperarData}
            setModalSave={setOpen}
            actionSelect={setActionSelect}
            dataSearch={getDoctorSearchPage}
            dataInitial={getDataDoctor}
        />
    </>
    return (
        <>
            {props?.isNOtProtected == true ?
                bodyView : <Protected>
                    {bodyView}
                </Protected>

            }
        </>
    );
};
