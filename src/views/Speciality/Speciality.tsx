import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { areaService } from "@/service/services/Area.service";
import React, { useEffect, useState } from "react";
import { ConfirmDialog } from '@components/common/DialogConfirm';
import { ModalView } from '@components/common/Modal';
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { Button, InputAdornment,Autocomplete, TextField, Grid, CircularProgress, Snackbar, Alert, FormControl, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "@/toolbox/defaults/static-roles";
import { ModalMedicalCenter } from "../MedicalCenter/Modal";
import { SpecialityService } from "@/service/services/Speciality.service";
import { ModalSpecility } from "./Modal";
// import { ModalBusinessArea } from "./Modal";


export const SpecialtyView: React.FC<any> = (props: any): JSX.Element => {
    const { MedicalCenterReducer ='' } = props;
    const user_data = readLocalStorage(KEY_USER_DATA);
    const type_user = user_data.user.role;

    const [dataSpeciality, setDataSpeciality] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [actionSelect,setActionSelect] = useState<any>('')
    const [Dialog, setDialog] = useState<any>({
        open: false,
        title: 'Eliminar',
        confirm: false,
        id: null,
        message: ``
    })
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'success',
        message: 'Error',
        autoHideDuration: 5000,
     })


    const getDataSpeciality = async () => {
        const resp: any = await SpecialityService.getSpecialtyPage();
        console.log(resp)
        if (resp.data) {
            setDataSpeciality(resp.data);
        }
    }
    const getDataSpecialityByMedicalCenter = async (id_medical_center) => {
        const resp: any = await SpecialityService.getDataSpecialityByMedicalCenter(id_medical_center);
        console.log(resp)
        if (resp.data) {
            setDataSpeciality(resp.data);
        }
    }


    const RecuperarData = async (data) => {
        const { action, id } = data;
        switch (action) {
            case 'edit':
                setOpen(true)
                setData(data)
                break;
            case 'delete':
                setDialog(prev => ({ ...prev, message: ``, id: id, open: true, confirm: true }));
                break;
            default:
                break;
        }
    }

    const Delete = async () => {
        try {
            if (Dialog.confirm == true) {
                const resp_delete = await areaService.deleteArea(Dialog.id)
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
                getDataInitial();
                console.log(resp_delete)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getDataInitial = () => {
        if(type_user == ROLE_SUPER_ADMIN){
            getDataSpeciality();
        }

        if(type_user == ROLE_ADMIN){
            const medicalCenterID = MedicalCenterReducer.id_medical_center;
            getDataSpecialityByMedicalCenter(medicalCenterID);
        }
    }
    // useEffect(() => {
    //     getDataInitial()
    // }, [])

    useEffect(() => {
        getDataInitial()
    }, [MedicalCenterReducer.id_medical_center])


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
            <ModalSpecility
              open = {open}
              setOpen = {setOpen}
              actionSelect = {actionSelect}
              getDataInitial = {getDataInitial}
              data = {data}
            />

            <TableDataV2
                data={dataSpeciality}
                header={[
                    { name: 'name', label: 'Nombre', filter: false, Chip: false, avatar: false },
                    { name: 'name_medical_center', label: 'Centro Médico', filter: false, Chip: false, avatar: false },
                    { name: 'status', label: 'Estado', filter: false, Chip: true, avatar: false },
                ]}
                status_action
                checkbox
                title={'Especialidades'}
                RecuperarData={RecuperarData}
                setModalSave={setOpen}
                actionSelect={setActionSelect}
            />
        </Protected>
    );
};
