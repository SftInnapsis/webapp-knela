import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Icon } from '@components/common/Icon';
import { Paper, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { CancelIcon, SaveIcon } from "@toolbox/constants/icons";
import PersonIcon from '@mui/icons-material/Person';
// import './Modal.css';
import './Modal.sass';
import EmailIcon from '@mui/icons-material/Email';
import { Input } from '../Input';
import { VALIDATORS } from '@/toolbox/helpers/validation-rules';
import { InputRef } from '../Input/InputInterfaces';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationRepository } from '@/service/repositories/Authentication.repository';
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';
import { Props } from "./Modal.type";


export const ModalView: React.FC<Props> = (props: Props) => {
   const { children, title, open, setOpen } = props
   return (
      <div>
         <Modal
            open={open}
            onClose={() => { setOpen(false) }}>
            <div className='Modal'>
               <div className='Title'>
                  <span >{title}</span>
               </div>
               <div className='Body'>
                  {
                     children
                  }
               </div>
            </div>
         </Modal>
      </div>
   );
}
