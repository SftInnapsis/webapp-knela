import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Modal, Snackbar, Alert, TextField, Grid, Button } from '@mui/material';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationService } from '@/service/services/Authentication.service';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import { ROLE_PROFESSIONAL } from '@/toolbox/constants/role-type';
import { userService } from '@/service/services/User.service';
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { AccountPerfil } from './AccountPerfil';
import { ROUTE_ACCOUNT_PERFIL } from '@/toolbox/constants/route-map';
import { useHistory } from 'react-router-dom';
// mocks_
// import account from '../../../_mock/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Inicio',
    icon: 'eva:home-fill',
  },
  {
    label: 'Perfil',
    icon: 'eva:person-fill',
  },
  {
    label: 'Cambiar contraseña',
    icon: 'eva:person-fill',
  },
  {
    label: 'Configuración',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const history = useHistory();
  const [open, setOpen] = useState(null);
  const [data, setData] = useState({
    confirm_password:'',
    new_password:'',
    old_password:''
  })


  const [error, setError] = useState('')
  //const open_perfil = AccountPerfil(ROUTE_ACCOUNT_PERFIL);

  //EJEMPLO
  const data_user = readLocalStorage(KEY_USER_DATA);

  const account = {
    photoURL: '',
    displayName: data_user.user.name + ' ' + data_user.user.last_name,
    role: data_user.user.role
  }
  //Asta aqui

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (label) => {
    setOpen(null);
    if(label == 'Cambiar contraseña'){
      setOpenModal(true)
    }
    else if (label == 'Perfil'){
      //acepta solo rutas
      history.push(ROUTE_ACCOUNT_PERFIL)
      } 
  };

  const [openModal, setOpenModal] = useState<any>(false);

  const [snackBarConfig, setSnackBarConfig] = useState<any>({
    open: false,
    severity: 'error',
    message: 'Error',
    autoHideDuration: 3000,
 })

  const logout = () => {
    handleClose('');
    authenticationService.logout().then(res => {
      if (!res.error) {
        switch (data_user?.user?.role) {
          case 'DOCTOR':
            window.location.replace('/login/doctor');
            break;
          case 'PACIENTE':
            window.location.replace('/login/paciente');
            break;
          case 'TUTOR':
            window.location.replace('/login/tutor');
            break;
          case ROLE_ADMIN:
            window.location.replace('/login/admin-centro-medico');
            break;
          case ROLE_SUPER_ADMIN:
            window.location.replace('/login/admin');
            break;
          case ROLE_PROFESSIONAL:
            window.location.replace('/login/equipo-medico');
            break;
          default:
            window.location.replace('/login/admin-centro-medico');
        }

      }
    }
    )
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(data?.old_password == ''){return setError('old_password')}
    if(data?.new_password == ''){return setError('new_password')}
    if(data?.confirm_password == ''){return setError('confirm_password')}

    const resp = await userService.changePasswordUser(data)
    if(resp.data){
      setSnackBarConfig({...snackBarConfig, open: true, severity: 'success', message:'Su contraseña ha sido cambiada con éxito'})
    }else{
      setSnackBarConfig({...snackBarConfig, open: true, severity: 'warning', message:'Ocurrio un problema, vuelva a intentar'})
    }

    setOpenModal(false)
  }

  const handleInputChange = (e) => {
    setError('')
    const changedFormValues = {
        ...data,
        [e.target.name]: e.target.value
      }
     setData(changedFormValues);
}

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => { setOpenModal(false) }}>
        <div className='Modal'>
          <div className='Title'>
            <Typography variant='h5' fontWeight={700}>
              {'ACTUALIZAR CONTRASEÑA'}
            </Typography>
          </div>
          <div className='Body'>
          <form onSubmit={handleSubmit} >
            <Grid container direction="row" spacing={2}>
               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="old_password"
                     placeholder="Contraseña Actual*"
                     label="Contraseña Actual*"
                     sx={{ bgcolor: '#fff', mb:2 }}
                     name="old_password"
                     error={error == 'old_password' ? true : false}
                     type="text"
                     value={data?.old_password}
                     onChange={handleInputChange}
                     helperText={error == 'old_password' ? 'Campo es obligatorio' : ''}
                  />
                  <TextField
                     fullWidth
                     size="small"
                     id="new_password"
                     placeholder="Nueva Contraseña*"
                     label="Nueva Contraseña*"
                     sx={{ bgcolor: '#fff', mb:2 }}
                     name="new_password"
                     error={error == 'new_password' ? true : false}
                     type="text"
                     value={data?.new_password}
                     onChange={handleInputChange}
                     helperText={error == 'new_password' ? 'Campo es obligatorio' : ''}
                  />
                  <TextField
                     fullWidth
                     size="small"
                     id="confirm_password"
                     placeholder="Retipa Nueva Contraseña*"
                     label="Retipa Nueva Contraseña*"
                     sx={{ bgcolor: '#fff', mb:2 }}
                     name="confirm_password"
                     error={error == 'confirm_password' ? true : false}
                     type="text"
                     value={data?.confirm_password}
                     onChange={handleInputChange}
                     helperText={error == 'confirm_password' ? 'Campo es obligatorio' : ''}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                        <Button
                            onClick={() => { setOpenModal(false) }}
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
                            {'Actualizar' }
                        </Button>
                    </Grid>
               </Grid>
          </form>
          </div>
        </div>
      </Modal>
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
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {account.email} */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>handleClose(option.label)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={() => { logout() }} sx={{ m: 1 }}>
          Salir
        </MenuItem>
      </Popover>
    </>
  );
}
