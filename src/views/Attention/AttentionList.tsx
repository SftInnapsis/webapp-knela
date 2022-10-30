import { TableDataV2 } from "@/components/common/Tablev2"
import { Protected } from "@/components/layout/Protected";
import { attentionService } from "@/service/services/Attention.service"
import { ROUTE_ATTENTION } from "@/toolbox/constants/route-map";
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export const AttentionList = (props) => {
    const history = useHistory()

    const [data, setData ] = useState([]);
    const [open, setOpen] = useState(false)
   
    const [actionSelect,setActionSelect] = useState('')
    const dataInitial = async() => {
        const resp = await attentionService.getAttentionAdmin();
        setData(resp.data)
    }

    const dataSearch = () => {
        //consumir api de busqueda
    }
    
    const RecuperarData = (data) => {
        if(actionSelect == 'save'){
            history.push(ROUTE_ATTENTION)
        }
    }
    useEffect(()=>{
        if(actionSelect == 'save'){
            history.push(ROUTE_ATTENTION)
        }
    },[actionSelect])


    useEffect(()=> {
        dataInitial()
    },[])
    return (
        <Protected>
          <TableDataV2
                data={data}
                header={[
                    { name: 'patientsRUT', label: 'RUT Paciente', filter: false, Chip: false, avatar: false },
                    { name: 'patientsName', label: 'Paciente', filter: false, Chip: false, avatar: false },
                    { name: 'attentionTypeName', label: 'Tipo de Atencion', filter: false, Chip: true, avatar: false },
                    { name: 'doctorRUT', label: 'RUT Doctor', filter: false, Chip: true, avatar: false },
                    { name: 'doctorName', label: 'Doctor', filter: false, Chip: true, avatar: false },
                    { name: 'nameArea', label: 'Area', filter: false, Chip: true, avatar: false },
                    { name: 'date_entry', label: 'Fecha de Ingreso', filter: false, Chip: true, avatar: false },
                    { name: 'statusPatientName', label: 'Estado', filter: false, Chip: true, avatar: false },
                ]}
                status_action
                checkbox
                title={'Mis Atenciones Medicas'}
                RecuperarData={RecuperarData}
                setModalSave={setOpen}
                actionSelect={setActionSelect}
                dataInitial = {dataInitial}
                dataSearch = {dataSearch}
            />
        </Protected>
    )
}