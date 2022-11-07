import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import { useEffect, useState } from "react";

export const DoctorIndependiente =(props)=>{
    const [data, setData] = useState([]);

    const getDataDoctorIndependiente = async() => {
        const resp = await doctorService.getDoctorIndependientePage();
        // console.log()
        // setData(resp.data)
    }

    useEffect(()=> {
        getDataDoctorIndependiente()

    },[])

    return(
        <Protected>
        <TableDataV2
                data={data}
                header={[
                    { name: 'name', label: 'Nombre', filter: false, Chip: false, avatar: false },
                    { name: 'name_medical_center', label: 'Centro Médico', filter: false, Chip: false, avatar: false },
                    { name: 'status', label: 'Estado', filter: false, Chip: true, avatar: false },
                ]}
                status_action
                checkbox
                title={'Doctores Independientes'}
                //RecuperarData={RecuperarData}
                //setModalSave={setOpen}
                //actionSelect={setActionSelect}
            />
        </Protected>

    );
}