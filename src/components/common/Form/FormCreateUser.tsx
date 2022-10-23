import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import {MoreIcon } from "@toolbox/constants/icons";
import { FormProps } from './Form.type';
// import DialogCreateEnterprise from "../../components/dialog/DialogCreateEnterprise";
const getPassword = () => {
  var chars = "$+=?@_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.trim().charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

const TypeUsers = [
  { id: 1, title: 'Vendedor', year: 1994 },
  { id: 2, title: 'Administrador', year: 1972 }
];
export const FormCreateUser:React.FC<FormProps>=({
   handleNext,handleBack,error, setError
}):JSX.Element=>{
  const [formValuesUser, setFormValuesUser] = useState({
    typeuser: "",
    name: "",
    email: "",
    password: getPassword()
  });
  const { typeuser, name, email, password } = formValuesUser;
  const [open, setOpen] = useState(false);
  // metodos para abrir el combobox
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleInputChangeUser = (e) => {
    const changedFormValuesUser = {
      ...formValuesUser,
      [e.target.name]: e.target.value
    }
    changedFormValuesUser.typeuser.trim() !== "" && setError("");
    changedFormValuesUser.name.trim() !== "" && setError("");
    changedFormValuesUser.email.trim() !== "" && setError("");
    setFormValuesUser(changedFormValuesUser);
  }
  //método para validar errores y enviar la data del usuarioAdmin
  const handleSubmitUserAdmin = (event) => {
    event.preventDefault();

    if (!typeuser.trim()) {
      return setError("typeuser");
    }
    if (!name.trim()) {
      return setError("name");
    }
    if (!email.trim()) {
      return setError("email");
    }
     else {
      const dataUser = {
        typeuser: typeuser,
        nombre: name,
        email: email,
        password:password
      };
      console.log({
        dataUser,
      });
      // setFormValuesUser({
      //   typeuser: "",
      //   name: "",
      //   email: "",
      //   password: ""
      // });
      handleNext();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitUserAdmin} >
        <FormControl fullWidth>
          <InputLabel id="typeuser-label">Tipo-Usuario</InputLabel>
          <Select
            labelId="typeuser-label"
            id="typeuser"
            open={open}
            fullWidth
            error={error === "typeuser" ? true : false}
            onClose={handleClose}
            onOpen={handleOpen}
            name="typeuser"
            value={typeuser}
            label="Tipo-Usuario"
            onChange={handleInputChangeUser}
          >
            {TypeUsers.map((option, i) => {
              return <MenuItem key={i} value={option.title}>{option.title}</MenuItem>
            })
            }
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          fullWidth
          error={error === "name" ? true : false}
          helperText={error === "name" ? "Nombre es es un campo requerido" : ""}
          label="Nombre*"
          name="name"
          type="text"
          value={name}
          onChange={handleInputChangeUser}
        />
        <TextField
          margin="normal"
          fullWidth
          error={error === "email" ? true : false}
          helperText={error === "email" ? " Correo Electrónico es un campo requerido" : ""}
          id="email"
          label="Correo electrónico*"
          name="email"
          type="email"
          value={email}
          onChange={handleInputChangeUser}
        />
        <TextField
          margin="normal"
          fullWidth
          id="password"
          label="Password*"
          InputLabelProps={{ shrink: true}}
          name="password"
          type="password"
          value={password}
          disabled
          onChange={handleInputChangeUser}
        />
        <Button
          variant="contained"
          endIcon={<MoreIcon />}
          onClick={()=>{handleBack()}}
          sx={{ mt: 3, mb: 2, ml: 25 }}
        >
          Regresar
        </Button>
        <Button
          type="submit"
          variant="contained"
          endIcon={<MoreIcon />}
          sx={{ mt: 3, mb: 2, ml: 25 }}
        >
          Registrarme
        </Button>
      </form>
    </>
  )
}
