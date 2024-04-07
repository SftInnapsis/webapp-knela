import { ConfirmDialog } from "@/components/common/DialogConfirm";
import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import { ROUTE_DETAIL_DOCTORES_INDEPENDIENTES } from "@/toolbox/constants/route-map";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Snackbar, Alert} from '@mui/material';


export const DoctorIndependiente = (props) => {
   let history = useHistory();
    const [data, setData] = useState<any>([]);
    const [actionSelect, setActionSelect] = useState<any>('');
    const [open, setOpen] = useState<boolean>(false);
    const [docSelected, setDocSelected] = useState<any>(null)
    const [Dialog, setDialog] = useState<any>({
        open: false,
        title: 'Deshabilitar',
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

    const getDataDoctorIndependiente = async () => {
        const resp = await doctorService.getDoctorIndependientePage();
        if (resp.data) {
            setData(resp.data);
        }
    }

    const RecuperarData = async (data) => {
        const { action, id, name } = data;
        setActionSelect(action)
        console.log(action)
        switch (action) {
            case 'accept':
               if(data.status_validation == "1"){
                setSnackBarConfig({...snackBarConfig, open:true,severity:'warning', message:'El usuario ya se encuentra activo' })
               }else{
                setDocSelected(data);
                setDialog(prev => ({ ...prev, message: `¿Desea activar al Doctor ${name}?`, id: id, open: true, confirm: true }));
               }
               break;
            case 'delete':
                setDialog(prev => ({ ...prev, message: `¿Desea desactivar al Doctor ${name}?`, id: id, open: true, confirm: true }));
                break;
            case 'view':
               history.push(ROUTE_DETAIL_DOCTORES_INDEPENDIENTES, { data: data });
            break;
            default:
                break;
        }
    }

    const confirmDialog = async () => {
      try {

          if (Dialog.confirm == true && actionSelect == 'delete') {
             console.log('eliminado')
          }

          if(Dialog.confirm == true && actionSelect == 'accept'){
            const respAcept = await doctorService.aceptOrDeniedDoctorIndependent(docSelected.iddoctor, 1)
            setSnackBarConfig({...snackBarConfig, open:true,
                    severity:respAcept.data.status ? 'success': 'error',
                    message: respAcept.data.status ? 'Aceptado con éxito':'Ocurrio un problema'})
            getDataDoctorIndependiente()
          }
      } catch (e) {
          console.log(e)
      }
  }

    useEffect(() => {
        getDataDoctorIndependiente()

    }, [])

    console.log(data)

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
                onConfirm={() => confirmDialog()}
                onClose={() => setDialog(prev => ({ ...prev, open: false }))}
            />
            <TableDataV2
                data={data}
                header={[
                    { name: 'name_all', label: 'Nombre Completo', filter: false, Chip: false, avatar: false },
                    { name: 'rut', label: 'Rut', filter: false, Chip: true, avatar: false },
                    { name: 'mail', label: 'Correo', filter: false, Chip: false, avatar: false },
                    { name: 'status_validation_name', label: 'Estado', filter: false, Chip: true, avatar: false },
                ]}
                status_action
                checkbox
                title={'Doctores Independientes'}
                RecuperarData={RecuperarData}
                view
                disabled_edit
                accept
            //setModalSave={setOpen}
            //actionSelect={setActionSelect}
            />
        </Protected>

    );
}
