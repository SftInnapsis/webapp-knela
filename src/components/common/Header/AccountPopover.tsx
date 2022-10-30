import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationService } from '@/service/services/Authentication.service';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
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
    label: 'Configuración',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const data_user = readLocalStorage(KEY_USER_DATA);
  const account = {
    photoURL: '',
    displayName: data_user.user.name + ' '+ data_user.user.last_name,
    role: data_user.user.role
  }
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const logout = () => {
    handleClose();
    authenticationService.logout().then(res => {
        if (!res.error) {
            switch(data_user?.user?.role)
            {
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
                    window.location.replace('/login/admin')
            }
           
        }
    }
    )
}
  return (
    <>
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
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={()=>{logout()}} sx={{ m: 1 }}>
          Salir
        </MenuItem>
      </Popover>
    </>
  );
}
