import React, { useState, useMemo, useRef, useEffect,createRef} from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert, Avatar } from '@mui/material';
import { Icon } from '@components/common/Icon';
import { Paper, Card, List, CardActionArea, InputBase, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { CancelIcon, SaveIcon } from "@toolbox/constants/icons";
import PersonIcon from '@mui/icons-material/Person';
// import './Modal.css';
import '@components/common/Modal/Modal.sass';
import EmailIcon from '@mui/icons-material/Email';
import { VALIDATORS } from '@/toolbox/helpers/validation-rules';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { authenticationRepository } from '@/service/repositories/Authentication.repository';
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';
import { professionalService } from '@/service/services/Professional.service';
import { ubigeoService } from '@/service/services/Ubigeo.service';
import { areaService } from '@/service/services/Area.service';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from '@mui/icons-material/Send';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from '@mui/icons-material/Delete';
import { MainBody } from './Childrens/MainBody';
import logoknelaV2 from '@assets/images/logoknelaV2.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import { chatService } from "@/service/services/Chat.service";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import GroupsIcon from '@mui/icons-material/Groups';
import { EquipoModal } from "./EquipoModal";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_PROFESSIONAL } from '@/toolbox/constants/role-type';

type ModalProps = {
   open: boolean,
   setOpen: any,
   idAttention: any
//    actionSelect?: string,
//    recoveryData?: any,
   //    savePatientMaster?: ({ }) => void,
   //    editPatientMaster?: ({ }) => void,
}


export const ParticipantChatModal: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
    const { open, setOpen, idAttention } = props
    const [participantsPublic, setParticipantPublic] = useState<any>([])
    const [participantsPublicNotEmisor, setParticipantPublicNotEmisor] = useState<any>([])
    const [participantEmisor, setParticipantEmisor] = useState<any>(null)
    const [openModalEquipo, setOpenModalEquipo] = useState<any>(false)
    const [idChat, setIdChat] = useState<any>(null)
    const [typeChat, setTypeChat] = useState<any>(null)
    const userData = readLocalStorage(KEY_USER_DATA)
    const getListParticipants = async (idattention) => {
        const resp = await chatService.ListParticipantAtentiton(idattention);
        let particpanNotEmisor
        if(userData?.user?.role == ROLE_PROFESSIONAL){
            particpanNotEmisor = resp?.data.filter(x => x.idprofessional != userData?.user.id_professional)
        }else{
            particpanNotEmisor = resp?.data.filter(x => x.idprofessional != userData?.user.id_doctor)
        }
        setParticipantPublicNotEmisor(particpanNotEmisor)
        setParticipantPublic(resp?.data)
    }
   //  const [message, setMessage] = useState([]);

    const validateOrCreateChat = async (idattention, id_participant_chat_receptor, id_participant_chat_emisor) => {
        const resp = await chatService.validateOrCreateChatPrivate(idattention, id_participant_chat_receptor, id_participant_chat_emisor);
        return resp?.data
    }

    const abrirChatPublic = (idChat) => {
      if (idChat) {
         setIdChat(idChat)
         setTypeChat(1)
         setOpenModalEquipo(true)
      }
    }

   const abrirChat = async (data) => {
      let participantEmisorFind;
      if(userData?.user?.role == ROLE_PROFESSIONAL){
          participantEmisorFind = participantsPublic.find(item => item.idprofessional == userData?.user.id_professional)
      }else{
          participantEmisorFind = participantsPublic.find(item => item.iddoctor == userData?.user.id_doctor)
      }

      const idChat = await validateOrCreateChat(idAttention, data?.idParticipant, participantEmisorFind?.idParticipant)
      // if (idChat) {
      //    onListMessage(idChat)
      // }
    if(idChat)
    {
      setIdChat(idChat)
      setTypeChat(2)
      setOpenModalEquipo(true)
    }
   }

    useEffect(()=>{
        // if(open){
            getListParticipants(idAttention)
            let participantEmisorFind;
            if(userData?.user?.role == ROLE_PROFESSIONAL){
                participantEmisorFind = participantsPublic.find(item => item.idprofessional == userData?.user.id_professional)
            }else{
                participantEmisorFind = participantsPublic.find(item => item.iddoctor == userData?.user.id_doctor)
            }
            setParticipantEmisor(participantEmisorFind)


    },[])


   //  const onListMessage = async (idChat) =>{
   //    const res:any = await chatService.getDetailMessage(idChat);
   //    console.log(res)
   //    if(res && res.data && res.data.detail)
   //    {
   //       console.log(res.data.detail)
   //       setMessage(res.data.detail)
   //    }
   // }

   const bodyModal = (
      <Box sx={{
         position: "absolute", top: "50%", left: "50%", transform: "translate(60%, -50%)", width: 450, height: 670,
         bgcolor: "background.paper", boxShadow: 24
      }}>
         <Grid item container xs={12} direction='row' justifyContent="space-between" alignItems={'center'} sx={{ bgcolor: '#28C4AC', px: 2, height: 70 }}>
            <Grid item container direction='row' alignItems={'center'} xs={11}>
               <Avatar
                  alt="Remy Sharp"
                  src={logoknelaV2}
                  sx={{ width: 66, height: 66, mr: 2 }}
               />
               <div style={{color:'#C22828', fontWeight:600,fontSize:'25px'}}>KNELA</div>
            </Grid>
            <Grid item container direction='row' xs={1}>
               <ExpandMoreIcon />
            </Grid>
         </Grid>
         <Grid>
               <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                   <ListItem onClick={()=>{abrirChatPublic(participantsPublic[0]?.idchats)}}>
                       <ListItemAvatar>
                           <Avatar>
                               <GroupsIcon/>
                           </Avatar>
                       </ListItemAvatar>
                       <ListItemText primary={'Chat Grupal'} secondary={'Grupo'} />
                   </ListItem>
            {
                participantsPublicNotEmisor.map((item) => {
                    return(
                        // item?.idParticipant != participantEmisor?.idParticipant &&
                        <ListItem onClick={()=>{abrirChat(item)}}>
                            <ListItemAvatar>
                                <Avatar>
                                {item?.name[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item?.name} secondary={item?.name_rol} />
                        </ListItem>
                    )

                })
            }
            </List>

         </Grid>
      </Box>
   )

   return (
      <div>
         <Modal
            open={open}
            onClose={() => { setOpen(false) }}>
            {bodyModal}
         </Modal>
          <EquipoModal
                open={openModalEquipo}
                setOpen={setOpenModalEquipo}
                idChat = {idChat}
                typeChat = {typeChat}
               //  message={message}
            />
      </div>
   );
}
