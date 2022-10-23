import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import { memo } from "react";
import Slide from '@mui/material/Slide';
import { ButtonComponent } from "../Button/Button";
import { CloseCircleIcon, InfoCircleIcon, WarningCircleIcon, SuccessCircleIcon } from "@toolbox/constants/icons";
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Props, RefObject, SnackVariant } from "./SnackDialog.type.";

import './SnackDialog.sass'

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & { children?: React.ReactElement<any, any> },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

const Component: React.FC<Props> = forwardRef(
   ({ onClose }, ref: Ref<RefObject>
) => {
   const [open, setOpen]       = useState<boolean>(false);
   const [title, setTitle]     = useState<string>('');
   const [message, setMessage] = useState<string>('');
   const [variant, setVariant] = useState<SnackVariant>('info');

   const handleClose = () => {
      setOpen(false);
      onClose && onClose(variant);
   }
   useImperativeHandle(ref, () => ({
      showDialog(variant: SnackVariant, title: string, description: string) {
         setVariant(variant || 'info');
         setTitle(title || 'Alerta');
         setMessage(description || 'Mensaje de alerta');
         setOpen(true);
      }
   }));

   const TYPES_MODALS = {
      info: {
         icon: <InfoCircleIcon />,
         color: '#59c4e4'
      },
      warning: {
         icon: <WarningCircleIcon />,
         color: '#ffb64a'
      },
      success: {
         icon: <SuccessCircleIcon />,
         color: '#4caf83'
      },
      error: {
         icon: <CloseCircleIcon />,
         color: '#e45959'
      }
   }

   const MODAL = TYPES_MODALS[variant];

   return (
      <Dialog
         open    = {open}
         onClose = {handleClose}
         classes={
             {paper: "c-snack-dialog-continer"}
         }
         BackdropProps={{ className: 'c-snack-dialog-backdrop' }}
         maxWidth={'xs'}
         TransitionComponent={Transition}
         aria-labelledby="alert-dialog-slide-title"
         aria-describedby="alert-dialog-slide-description"
      >
         <DialogTitle
            className='c-snack-dialog-title'
            style={{background: MODAL.color}}
         >
            {MODAL.icon}
         </DialogTitle>
         <DialogContent className='c-snack-dialog-content'>
            <h2>{title}</h2>
            <p>{message}</p>
         </DialogContent>
         <DialogActions className='c-snack-dialog-action'>
            <ButtonComponent
               text="OK"
               styleButton="contained"
               action={handleClose}
               typeStatus={variant}>
            </ButtonComponent>
         </DialogActions>
      </Dialog>
   );
})

Component.defaultProps = {
   onClose: () => {},
   onConfirm: () => {}
}

export const SnackDialog = memo(Component);
