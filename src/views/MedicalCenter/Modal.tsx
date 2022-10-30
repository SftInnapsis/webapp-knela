import { medicalCenterService } from "@/service/services/MedicalCenter.service";
import { ubigeoService } from "@/service/services/Ubigeo.service";
import { Alert, Autocomplete, Button, Grid, Modal, Snackbar, TextField } from "@mui/material";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { useEffect, useState } from "react";

export const ModalMedicalCenter = (props) => {
    console.log(props)
    const { open, setOpen, actionSelect, getDataMedicalCenter } = props
    const [dataTypeAttention, setDataTypeAttention] = useState<any>([
        { id: 1, name: 'Hospitalización' },
        { id: 2, name: 'Ambulatorio' }
    ])
    const [typeAttention, setTypeAttention] = useState<any>({id: 0, name: ''})
    const [ubigeo, setUbigeo] = useState<any>({ 
        country: [], 
        departament: [], 
        province: [], 
        district: [] });
    const [country, setCountry] = useState<any>({id: 0, name: ''})
    const [departament, setDepartament] = useState<any>({id: 0, name: ''})
    const [province, setProvince] = useState<any>({id: 0, name: ''})
    const [district, setDistrict] = useState<any>({id: 0, name: ''})
    const initialMedicalCenter = { id: 0, rut: '', name: '', phone: '', attention_type: '', address: '', mail: '' }
    const [medicalCenterSelected, setMedicalCenterSelected] = useState<any>(initialMedicalCenter)
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'success',
        message: 'Error',
        autoHideDuration: 5000,
    })

    const [error, setError] = useState<any>('');


    const getPais = async () => {
        const resp_pais = await ubigeoService.getCountry();
        if (resp_pais.data) {
            setUbigeo({ ...ubigeo, country: resp_pais.data, departament: [], province: [], district: [] })
        }
    }

    const getDepartament = async (id_country) => {
        const resp_departament = await ubigeoService.getDepartament(id_country);
        if (resp_departament.data) {
            setUbigeo({ ...ubigeo, departament: resp_departament.data, province: [], district: [] })
        }
    }

    const getProvince = async (id_departament) => {
        const resp_province = await ubigeoService.getProvince(id_departament);
        if (resp_province.data) {
            setUbigeo({ ...ubigeo, province: resp_province.data, district: [] })
        }
    }

    const getDistrict = async (id_province) => {
        const resp_district = await ubigeoService.getDistrict(id_province);
        if (resp_district.data) {
            setUbigeo({ ...ubigeo, district: resp_district.data })
        }
    }

    const getUbigeo = async (id_district, id_province, id_department, id_country) => {
        const resp_ubigeo = await ubigeoService.getDistrictUbigeo(id_district, id_province, id_department, id_country)
        console.log(resp_ubigeo)
        setUbigeo({ country: resp_ubigeo.data.countries, departament: resp_ubigeo.data.departments, province: resp_ubigeo.data.provincies, district: resp_ubigeo.data.districts })
        setCountry(resp_ubigeo.data.country);
        setDepartament(resp_ubigeo.data.department);
        setProvince(resp_ubigeo.data.province)
        setDistrict(resp_ubigeo.data.district)
    }

    useEffect(() => {
        getPais();
        if (actionSelect == 'edit') {
            setMedicalCenterSelected(props.data)
            setTypeAttention(dataTypeAttention.find((value) => value.id == props.data.idattention_type))
            getUbigeo(props.data.iddistrict, props.data.idprovince, props.data.iddepartment, props.data.idcountry)
        }

        if (actionSelect == 'save') {
            setMedicalCenterSelected(initialMedicalCenter)
        }
    }, [])

    const handleInputChange = (e) => {
        const changedFormValues = {
            ...medicalCenterSelected,
            [e.target.name]: e.target.value
        }
        setMedicalCenterSelected(changedFormValues);
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (medicalCenterSelected.rut === '') { return setError('rut') }
        if (medicalCenterSelected.name === '') { return setError('name') }
        if (medicalCenterSelected.mail === '') { return setError('mail') }
        if (medicalCenterSelected.address === '') { return setError('address') }
        if (medicalCenterSelected.phone === '') { return setError('phone') }
        if (typeAttention.name === '') { return setError('idTypeAttention') }
        if (country.name === '') { return setError('country') }
        if (departament.name === '') { return setError('departament') }
        if (province.name === '') { return setError('province') }
        if (district.name === '') { return setError('district') }

        if (actionSelect == 'edit') {
            console.log('edit')
            const data_edit = { ...medicalCenterSelected, idattention_type: typeAttention.id, iddistrict: district.id }
            const resp_edit = await medicalCenterService.updateMedicalCenter(medicalCenterSelected.id, data_edit);
            if (resp_edit.data) {
                setSnackBarConfig({ open: true, severity: 'success', message: 'Centro Médico Actualizado' })
                props.getDataMedicalCenter();
                setOpen(false)
            } else {
                setSnackBarConfig({ open: true, severity: 'warning', message: 'No se pudo actualizar la información' })
                props.getDataMedicalCenter();
                setOpen(false)
            }
        }

        if (actionSelect == 'save') {
            console.log('save')
            const data_save = { ...medicalCenterSelected, idattention_type: typeAttention.id, iddistrict: district.id }

            const resp_save = await medicalCenterService.createMedicalCenter(data_save);
            if (resp_save.data) {
                setSnackBarConfig({ open: true, severity: 'success', message: 'Centro Médico creado con éxito' })
                props.getDataMedicalCenter();
                setOpen(false)
            } else {
                setSnackBarConfig({ open: true, severity: 'warning', message: 'No se pudo crear el Centro Médico' })
                props.getDataMedicalCenter();
                setOpen(false)
            }
        }
    }


    const bodyModal = (
        <div>
            <form onSubmit={handleSubmit} >
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            // error={error === "asunto" ? true : false}
                            // helperText={error === "asunto" ? " El asunto es un Campo  requerido" : ""}
                            size="small"
                            id="rut"
                            placeholder="Rut*"
                            sx={{ bgcolor: '#fff' }}
                            name="rut"

                            type="text"
                            value={medicalCenterSelected.rut}
                            onChange={handleInputChange}
                            error={error == 'rut' ? true : false}
                            helperText={error == 'rut' ? 'Campo es obligatorio' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            size="small"
                            id="name"
                            placeholder="Nombre*"
                            sx={{ bgcolor: '#fff' }}
                            name="name"

                            type="text"
                            value={medicalCenterSelected.name}
                            onChange={handleInputChange}
                            error={error == 'name' ? true : false}
                            helperText={error == 'name' ? 'Campo es obligatorio' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            size="small"
                            id="mail"
                            placeholder="Correo*"
                            sx={{ bgcolor: '#fff' }}
                            name="mail"

                            type="text"
                            value={medicalCenterSelected.mail}
                            onChange={handleInputChange}
                            error={error == 'mail' ? true : false}
                            helperText={error == 'mail' ? 'Campo es obligatorio' : ''}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            size="small"
                            id="address"
                            placeholder="Direccion*"
                            sx={{ bgcolor: '#fff' }}
                            name="address"
                            type="text"

                            value={medicalCenterSelected.address}
                            onChange={handleInputChange}
                            error={error == 'address' ? true : false}
                            helperText={error == 'address' ? 'Campo es obligatorio' : ''}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            size="small"
                            id="phone"
                            placeholder="Telefono*"
                            sx={{ bgcolor: '#fff' }}
                            name="phone"

                            type="text"
                            value={medicalCenterSelected.phone}
                            onChange={handleInputChange}
                            error={error == 'phone' ? true : false}
                            helperText={error == 'phone' ? 'Campo es obligatorio' : ''}
                        />
                    </Grid>

                    <Grid item xs={2} md={6} >
                        <Autocomplete
                            // disabled={visibleProyection ? false : true}
                            value={typeAttention}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                setTypeAttention(data)
                            }}
                            id="idattention_type"
                            options={dataTypeAttention}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField 
                                {...params} 
                                placeholder="Tipo Atencion" 
                                error={error=="idTypeAttention" ? true : false} 
                                helperText={error=="idTypeAttention"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Autocomplete
                            value={country}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                getDepartament(data.id);
                                setUbigeo({ ...ubigeo, country: data, departament: [], province: [], district: [] })
                                setCountry(data)
                            }}
                            id="idcountry"
                            options={ubigeo.country}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField 
                                {...params} 
                                placeholder="Pais" 
                                error={error=="country" ? true : false} 
                                helperText={error=="country"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Autocomplete
                            value={departament}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                getProvince(data.id);
                                setUbigeo({ ...ubigeo, departament: data, province: [], district: [] })
                                setDepartament(data)
                            }}
                            id="iddepartment"
                            options={ubigeo.departament}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField 
                                {...params} 
                                placeholder="Region" 
                                error={error=="departament" ? true : false} 
                                helperText={error=="departament"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Autocomplete
                            value={province}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                getDistrict(data.id);
                                setUbigeo({ ...ubigeo, province: data, district: [] })
                                setProvince(data)
                            }}
                            id="idprovince"
                            options={ubigeo.province}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField 
                                {...params} 
                                placeholder="Provincia" 
                                error={error=="province" ? true : false} 
                                helperText={error=="province"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Autocomplete
                            value={district}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                setUbigeo({ ...ubigeo, district: data })
                                setDistrict(data)
                            }}
                            id="iddistrict"
                            options={ubigeo.district}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField 
                                {...params} 
                                placeholder="Distrito" 
                                error={error=="district" ? true : false} 
                                helperText={error=="district"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Button
                            onClick={() => { setOpen(false) }}
                            variant="contained"
                            fullWidth
                            color="error"
                            startIcon={<CancelIcon />}
                            sx={{ background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}>
                            Cancelar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            startIcon={<SaveIcon />}
                            sx={{ background: '#3D8BD9', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#155172' } }}>
                            {actionSelect == 'edit' ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )

    return (
        <div>

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
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}>
                <div className='Modal'>
                    <div className='Title'>
                        <span > {actionSelect == 'edit' ? 'Actualizar Centro Médico' : 'Crear Centro Médico'}</span>
                    </div>
                    <div className='Body'>
                        {bodyModal}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
