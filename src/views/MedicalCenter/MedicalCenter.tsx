import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import { medicalCenterService } from "@/service/services/MedicalCenter.service";
import React, { useEffect, useState } from "react";
import { Button, InputAdornment, TextField, Grid, CircularProgress, Snackbar, Alert, Autocomplete, FormControl, OutlinedInput, InputLabel, MenuItem, Select, Modal } from '@mui/material';
import { ModalView } from '@components/common/Modal';
import { ConfirmDialog } from '@components/common/DialogConfirm';
import { ubigeoService } from "@/service/services/Ubigeo.service";
import '../../components/common/Modal/Modal.sass';
import { ModalMedicalCenter } from "./Modal";

export const MedicalCenter = (props) => {
   const [actionSelect,setActionSelect] = useState<any>('')
    const [error, setError] = useState<any>('')
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [dataMedicalCenter, setDataMedicalCenter] = useState<any>([]);
    const [Dialog, setDialog] = useState<any>({
        open: false,
        title: 'Deshabilitar',
        confirm: false,
        id: null,
        message: `¿Desea eliminar al contacto --- con Rut ----?`
    })
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'success',
        message: 'Error',
        autoHideDuration: 5000,
     })

    const getDataMedicalCenter = async () => {
        const resp: any = await medicalCenterService.getMedicalCenterPage();
        console.log(resp)
        if (resp.data) {
            setDataMedicalCenter(resp.data);
        }
    }
 
    const RecuperarData = async (data) => {
        console.log(data)
        const { action, id, name } = data;
        setActionSelect(action)
        switch (action) {
            case 'edit':
                setData(data);
                setOpen(true)
                // setMedicalCenterSelected({
                //    ...medicalCenterSelected, id:id, rut:data.rut, name:data.name, phone:data.phone, address:data.address, mail:data.mail
                // })
                break;
            case 'delete':
                setDialog(prev => ({ ...prev, message: `¿Desea deshabilitar el Centro Medico ${name}?`, id: id, open: true, confirm: true }));
                break;
            default:
                break;
        }
    }

    const Delete = async () => {
        try {
            if (Dialog.confirm == true) {
                const resp_delete = await medicalCenterService.deleteMedicalCenter(Dialog.id)
                if(resp_delete.data.status){
                    setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'success',
                        message: 'Se Desahabilito el Centro Medico con éxito',
                     }));
                }else{
                    setSnackBarConfig(prev => ({
                        ...prev,
                        open: true,
                        severity: 'success',
                        message: 'No se puedo desahibilitar el Centro Medico',
                     }));
                }
                getDataMedicalCenter();
                console.log(resp_delete)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getDataMedicalCenter();
    }, [])

    return (
        <Protected>
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
            <ModalMedicalCenter
            open = {open}
            setOpen = {setOpen}
            actionSelect = {actionSelect}
            getDataMedicalCenter = {getDataMedicalCenter}
            data = {data}
            />
            <TableDataV2
                data={dataMedicalCenter}
                header={[
                    // { name: 'id', label: 'id', filter: false },
                    { name: 'name', label: 'Nombre', filter: false, Chip: false },
                    { name: 'rut', label: 'Rut', filter: false, Chip: false },
                    { name: 'phone', label: 'Celular', filter: false, Chip: false },
                    { name: 'attention_type', label: 'Tipo de Atención', filter: false, Chip: true },
                    { name: 'name_flow', label: 'Tipo de Flujo', filter: false, Chip: true },
                    { name: 'address', label: 'Dirección', filter: false, Chip: true },
                    { name: 'district', label: 'Comuna', filter: false, Chip: true },
                    { name: 'status', label: 'Estado', filter: false, Chip: true },
                ]}
                status_action
                checkbox
                title={'Centros Médicos'}
                text_eliminar = {'Deshabilitar'}
                RecuperarData={RecuperarData}
                actionSelect={setActionSelect}
                setModalSave={setOpen}
            />
        </Protected>
    );
};
