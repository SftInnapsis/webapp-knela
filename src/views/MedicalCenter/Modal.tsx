import { medicalCenterService } from "@/service/services/MedicalCenter.service";
import { ubigeoService } from "@/service/services/Ubigeo.service";
import { Alert, Autocomplete, Button, Grid, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { useEffect, useState } from "react";

export const ModalMedicalCenter = (props) => {
    console.log(props)
    const { open, setOpen, actionSelect, getDataMedicalCenter } = props
    const [dataTypeAttention, setDataTypeAttention] = useState<any>([
        { id: 1, name: 'Hospitalización' },
        { id: 2, name: 'Ambulatorio' }
    ])
    const [dataTypeFlow, setDataTypeFlow] = useState<any>([
        { id: 1, name: 'SOFTNET' },
        { id: 2, name: 'ALTERNO' }
    ])
    const [typeAttention, setTypeAttention] = useState<any>({id: 0, name: ''})
    const [typeFlow, setTypeFlow] = useState<any>(null)
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
            setTypeFlow(dataTypeFlow.find((value) => value.id == props.data.type_flow))
            getUbigeo(props.data.iddistrict, props.data.idprovince, props.data.iddepartment, props.data.idcountry)
        }

        if (actionSelect == 'save') {
            setMedicalCenterSelected(initialMedicalCenter)
        }
    }, [])

    const handleInputChange = (e) => {
        setError('')
        if(e.target.name == 'rut'){
            // setVerify(false)
            var Fn = {
               // Valida el rut con su cadena completa "XXXXXXXX-X"
               validaRut: function (rutCompleto) {
                  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                     return false;
                  var tmp = rutCompleto.split('-');
                  var digv = tmp[1];
                  var rut = tmp[0];
                  if (digv == 'K') digv = 'k';
                  return (Fn.dv(rut) == digv);
               },
               dv: function (T) {
                  var M = 0, S = 1;
                  for (; T; T = Math.floor(T / 10))
                     S = (S + T % 10 * (9 - M++ % 6)) % 11;
                  return S ? S - 1 : 'k';
               }
            }

            var foo = e.target.value.split("-").join("")
            if (foo.length > 0 && foo.length < 10) {
               foo = foo.match(new RegExp('.{1,8}', 'g')).join("-");
               setMedicalCenterSelected(prev => ({ ...prev, rut: foo }))
            } else if (foo.length == 0) {
               setMedicalCenterSelected(prev => ({ ...prev, rut: "" }))
            }
        }else{
            const changedFormValues = {
                ...medicalCenterSelected,
                [e.target.name]: e.target.value
            }
            setMedicalCenterSelected(changedFormValues);

        }
    }

    const ValidateEmail = (mail) =>{
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
          return (true)
        }else{
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (medicalCenterSelected.name === '') { return setError('name') }
        if (medicalCenterSelected.name.length >= 150) {return setError('name_limit')}
        if (medicalCenterSelected.rut === '') { return setError('rut') }
        if (medicalCenterSelected.phone === '') { return setError('phone') }
        if (medicalCenterSelected.phone.length >= 15) { return setError('phone_limit') }
        if (medicalCenterSelected.mail === '') { return setError('mail') }
        let validate = ValidateEmail(medicalCenterSelected.mail)
        if(!validate){return setError('mail_invalid') }
        if (medicalCenterSelected.mail.length >= 100) { return setError('mail_limit') }
        if (medicalCenterSelected.address === '') { return setError('address') }
        if (medicalCenterSelected.address.length >= 150) { return setError('address_limit') }
        if (typeAttention.name === '') { return setError('idTypeAttention') }
        if (!typeFlow){return setError('type_flow')}
        // if (country.name === '') { return setError('country') }
        // if (departament.name === '') { return setError('departament') }
        // if (province.name === '') { return setError('province') }
        // if (district.name === '') { return setError('district') }

        if (actionSelect == 'edit') {
            console.log('edit')
            const data_edit = { ...medicalCenterSelected, idattention_type: typeAttention.id, iddistrict: district.id == 0? null:  district.id , type_flow: typeFlow?.id}
            const resp_edit = await medicalCenterService.updateMedicalCenter(medicalCenterSelected.id, data_edit);
            console.log(data_edit)
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
            const data_save = { ...medicalCenterSelected, idattention_type: typeAttention.id,iddistrict: district.id == 0? null:  district.id , type_flow: typeFlow?.id}

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
                <Grid item xs={12} md={12} >
                        <TextField
                            fullWidth
                            size="small"
                            id="name"
                            placeholder="Razon Social*"
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
                    <Grid item xs={12} md={12} >
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

                    <Grid item xs={12} md={12} >
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
                    <Grid item xs={2} md={6} >
                        <Autocomplete
                            // disabled={visibleProyection ? false : true}
                            value={typeFlow}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                setTypeFlow(data)
                            }}
                            id="idattention_type"
                            options={dataTypeFlow}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField
                                {...params}
                                placeholder="Tipo Atencion"
                                error={error=="idTypeAttention" ? true : false}
                                helperText={error=="idTypeAttention"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <Autocomplete
                            value={country}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {

                                if(data) {
                                 getDepartament(data.id)
                                }else{
                                    setDepartament({id: 0, name: ''});
                                    setProvince({id: 0, name: ''});
                                    setDistrict({id: 0, name: ''});
                                }

                                setCountry(data || [])
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
                    <Grid item xs={6} >
                        <Autocomplete
                            value={departament}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                if(data) {
                                    getProvince(data.id)
                                   }else{
                                       setProvince({id: 0, name: ''});
                                       setDistrict({id: 0, name: ''});
                                   }
                                   setDepartament(data || [])
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
                    <Grid item xs={6} >
                        <Autocomplete
                            value={province}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                                if(data) {
                                    getDistrict(data.id)
                                   }else{
                                       setDistrict({id: 0, name: ''});
                                   }
                                   setProvince(data || [])
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
                    <Grid item xs={6} >
                        <Autocomplete
                            value={district}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => {
                               data && setDistrict(data)
                            }}
                            id="iddistrict"
                            options={ubigeo.district}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField
                                {...params}
                                placeholder="Comuna"
                                error={error=="district" ? true : false}
                                helperText={error=="district"? "Campo requerido" : ""} />}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} container flexDirection='row'>
                        <Grid xs={6}>
                        <Button
                            onClick={() => { setOpen(false) }}
                            variant="contained"
                            fullWidth
                            color="error"
                            startIcon={<CancelIcon />}
                            sx={{ background: '#FFBB34', color: '#fff', mt: '10px', mr:1, '&:hover': { bgcolor: '#bf6c00' } }}>
                            Cancelar
                        </Button>
                        </Grid>
                        <Grid xs={6}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            startIcon={<SaveIcon />}
                            sx={{ background: '#3D8BD9', color: '#fff', mt: '10px',ml:1, '&:hover': { bgcolor: '#155172' } }}>
                            {actionSelect == 'edit' ? 'Actualizar' : 'Agregar'}
                        </Button>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} md={6} >

                    </Grid> */}
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
                        <Typography variant='h5' align='center' fontWeight={700}>
                        {actionSelect == 'edit' ? 'Actualizar Centro Médico' : 'Crear Centro Médico'}
                        </Typography>
                    </div>
                    <div className='Body'>
                        {bodyModal}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
