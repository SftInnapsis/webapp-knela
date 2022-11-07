
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import { BodyModal } from './BodyModal';
import Box from '@mui/material/Box';


type ModalProps = {
    open: boolean,
    setOpen: any,
    actionSelect?: string,
    //    savePatientMaster?: ({ }) => void,
    //    editPatientMaster?: ({ }) => void,
}



export const NotificacionModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {

    const { open, setOpen, actionSelect } = props

    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden'
        }
      }, [open])

    return (
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <Box sx={{
                    position: 'absolute', 
                    top: '50%', 
                    right: '-10%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 350, height: 500,
                    bgcolor: 'background.paper', 
                    border: '2px solid #000', 
                    borderRadius: '10px', boxShadow: 24, p: 4
                }}>
                    <BodyModal />
                </Box>

            </Modal>
        </div>
    );
}