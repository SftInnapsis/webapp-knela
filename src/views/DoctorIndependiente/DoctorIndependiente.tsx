import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import { useEffect, useState } from "react";

export const DoctorIndependiente = (props) => {
    const [data, setData] = useState<any>([]);
    const [actionSelect, setActionSelect] = useState<any>('');
    const [open, setOpen] = useState<boolean>(false);
    const [Dialog, setDialog] = useState<any>({
        open: false,
        title: 'Deshabilitar',
        confirm: false,
        id: null,
        message: `¿Desea eliminar al contacto --- con Rut ----?`
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
        switch (action) {
            case 'activate':
                setData(data);
                setDialog(prev => ({ ...prev, message: `¿Desea activar al Doctor ${name}?`, id: id, open: true, confirm: true }));
                // setMedicalCenterSelected({
                //    ...medicalCenterSelected, id:id, rut:data.rut, name:data.name, phone:data.phone, address:data.address, mail:data.mail
                // })
                break;
            case 'desactivate':
                setDialog(prev => ({ ...prev, message: `¿Desea desactivar al Doctor ${name}?`, id: id, open: true, confirm: true }));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getDataDoctorIndependiente()

    }, [])

    console.log(data)

    return (
        <Protected>
            <TableDataV2
                data={data}
                header={[
                    { name: 'name', label: 'Nombre', filter: false, Chip: false, avatar: false },
                    { name: 'last_name', label: 'Apellidos', filter: false, Chip: true, avatar: false },
                    { name: 'mail', label: 'Correo', filter: false, Chip: false, avatar: false },
                    { name: 'status', label: 'Estado', filter: false, Chip: true, avatar: false },
                ]}
                status_action
                checkbox
                title={'Doctores Independientes'}
                RecuperarData={RecuperarData}
            //setModalSave={setOpen}
            //actionSelect={setActionSelect}
            />
        </Protected>

    );
}