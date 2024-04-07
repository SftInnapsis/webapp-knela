
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { BodyModal } from './BodyModal';


type ModalProps = {
    open: boolean,
    setOpen: any,
    dataInitial?: any,
    recoveryData?: any,
    setRecoveryData?: any,
    savePublication?: any,
    editPublication?: ({ }) => void,
}

export const PublicarModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {

    const { open, setOpen, dataInitial, recoveryData, setRecoveryData, savePublication, editPublication } = props;
    const [publication, setPublication] = useState(recoveryData.publication);
    const [statusPatient, setStatusPatient] = useState(recoveryData.idstatus_patient);

    useEffect(() => {
        setPublication(recoveryData.publication)
        setStatusPatient(recoveryData.idstatus_patient)
    }, [recoveryData.publication])



    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setPublication('');
                    setStatusPatient(null);
                    setRecoveryData({})
                }}>

                <Box sx={{
                    position: "fixed",
                    top: 50,
                    right: 50,
                    width: 380,
                    height: '80%',
                    maxHeight: '80%',
                    // transform: "translate(50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                    borderRadius: 5,
                }}>
                    <BodyModal/>


                </Box>
            </Modal>
        </div>
    )
}