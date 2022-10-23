import { TextField, Button} from '@mui/material';
import React, { useState } from 'react';
import {ArrowBackIcon, ArrowDownIcon, ArrowRightIcon, MoreIcon } from "@toolbox/constants/icons";
import { Box } from '@mui/system';
import { FormProps } from './Form.type';
const initialFormValuesCompany = {
    rutempresa: "",
    razonsocial: "",
    rutrepresentative: "",
    namerepresentative: ""
}
export const FormCreateEnterprise:React.FC<FormProps>=({
   handleNext,error, setError
}):JSX.Element=>{
    const [formValuesCompany, setFormValuesCompany] = useState(initialFormValuesCompany);
    const { rutempresa, razonsocial, rutrepresentative, namerepresentative } = formValuesCompany;

    //metodo para obtener los datos de los input de empresa y almacenarlos a mi variable de estado
    const handleInputChangeCompany = (e) => {
        const changedFormValuesCompany = {
            ...formValuesCompany,
            [e.target.name]: e.target.value
        }
        changedFormValuesCompany.rutempresa.trim() !== "" && setError("");
        changedFormValuesCompany.razonsocial.trim() !== "" && setError("");
        changedFormValuesCompany.rutrepresentative.trim() !== "" && setError("");
        changedFormValuesCompany.namerepresentative.trim() !== "" && setError("");
        setFormValuesCompany(changedFormValuesCompany);
    }
    //método para validar errores y enviar la data de empresa
    const handleSubmitCompany = (event) => {
        event.preventDefault();

        if (!rutempresa.trim()) {
            return setError("rutempresa");
        }
        if (!razonsocial.trim()) {
            return setError("razonsocial");
        }
        if (!rutrepresentative.trim()) {
            return setError("rutrepresentative");
        }

        if (!namerepresentative.trim()) {
            return setError("namerepresentative");
        }
        else {
            const dataempresa = {
                rutempresa: rutempresa,
                razonsocial: razonsocial,
                rutrepresentative: rutrepresentative,
                namerepresentative: namerepresentative
            }
            const rpta = Validation(dataempresa);
            if (rpta === 0) {
                handleNext();
                setError("");
            } else {
                setError('Usuario0noencontrado');
            }
        }
    };

    const Validation = (data) => {
        if (data.rutempresa === "1234567") {
            return 0;
        }
        return -1;
    }
    return (
        <>
            <form onSubmit={handleSubmitCompany}>
                <TextField
                    margin="normal"
                    fullWidth
                    error={error === "rutempresa" ? true : false}
                    helperText={error === "rutempresa" ? "Rut de la Empresa es un campo requerido" : ""}
                    id="rutempresa"
                    label="Rut-Empresa*"
                    name="rutempresa"
                    type="text"
                    autoFocus
                    value={rutempresa}
                    onChange={handleInputChangeCompany}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    error={error === "razonsocial" ? true : false}
                    helperText={error === "razonsocial" ? "Razón Social es un campo requerido" : ""}
                    id="razonsocial"
                    label="Razón-Social*"
                    name="razonsocial"
                    type="text"
                    value={razonsocial}
                    onChange={handleInputChangeCompany}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    error={error === "rutrepresentative" ? true : false}
                    helperText={error === "rutrepresentative" ? "Rut del Representante es un campo requerido" : ""}
                    id="rutrepresentative"
                    label="Rut-Representante*"
                    name="rutrepresentative"
                    type="text"
                    value={rutrepresentative}
                    onChange={handleInputChangeCompany}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    error={error === "namerepresentative" ? true : false}
                    helperText={error === "namerepresentative" ? "Nombre del Representante es un campo requerido" : ""}
                    id="name-representative"
                    label="Nombre-Representante*"
                    name="namerepresentative"
                    type="text"
                    value={namerepresentative}
                    onChange={handleInputChangeCompany}
                />
                <Box
                    sx={{ color: "red", fontStyle: "italic", fontSize: 12 }}>
                    {error === `Usuario0noencontrado` && (<span>
                        Usuario no encontrado,Ingrese credenciales validas
                    </span>
                    )}
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<ArrowRightIcon />}
                    sx={{ mt: 1, mb: 2, ml: 30 }}
                >
                    Siguiente
                </Button>

            </form>
        </>
    )
}
