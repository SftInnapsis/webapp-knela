import { memo } from "react";
import { Props } from "./DialogConfirm.type";
import { ButtonComponent } from "../Button/Button";
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Theme,
} from "@mui/material";
import { makeStyles } from '@mui/styles';

import "./DialogConfirm.sass";

const useStyles = makeStyles((theme: Theme) => ({
   dialogTitle: {
      textAlign: "left",
      weight: 500,
      fontSize: "18px",
   },
   dialogActions: {
      justifyContent: "end",
   },
}));

const ConfirmDialogComponent: React.FC<Props> = ({
   open,
   title,
   message,
   onConfirm,
   onClose,
   textConfirm,
   type = "button",
   ...props
}) => {
  const styles = useStyles();
  return (
      <Dialog
         open={open}
         onClose={onClose}
         classes={{ paper: "c-dialog-confirm-continer" }}
         BackdropProps={{ className: "c-dialog-confirm-backdrop" }}
      >
         <DialogTitle
           sx={{color:'black',fontWeight:'bold'}}
         >
            {title ? title : ""}
         </DialogTitle>
         <DialogContent className="">
            {message ? (
               <div className="c-dialog-confirm-message">
                  <p>{message}</p>
               </div>
            ) : (
               props.content
            )}
         </DialogContent>
         <DialogActions
            className={`c-dialog-confirm-action ${styles.dialogActions}`}
            >
            <ButtonComponent
               text="Cancelar"
               styleButton="outlined-small"
               action={onClose}
               style={{marginLeft:"auto"}}
            ></ButtonComponent>
            <ButtonComponent
               text={ textConfirm ? textConfirm : type == "button" ? "Confirmar" : "Enviar"}
               styleButton="contained"
               action={()=>{onConfirm();onClose();}}
            ></ButtonComponent>
         </DialogActions>
      </Dialog>
  );
};

export const ConfirmDialog = memo(ConfirmDialogComponent);
