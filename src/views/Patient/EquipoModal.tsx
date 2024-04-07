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
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { chatService } from '@/service/services/Chat.service';
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import {getMessagetChat } from '@/redux/actions';

import { ROLE_PROFESSIONAL } from '@/toolbox/constants/role-type';

type ModalProps = {
   open: boolean,
   setOpen: any,
   actionSelect?: string,
   recoveryData?: any,
   idChat?: any,
   typeChat?:any,
   MessageReducer?:any,
   $action?:any,
   dataCabecera?:any
   // message?:any
   //    editPatientMaster?: ({ }) => void,
}


export const EquipoModalView: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
   const { open, setOpen, actionSelect, recoveryData, idChat, typeChat, dataCabecera} = props
   const user_data = readLocalStorage(KEY_USER_DATA)
   const inputRef = createRef();
   const { MessageReducer ='' } = props;
   // console.log(props.MessageReducer.messageChats)
   const [mensajeTemp, setMensajeTemp] = useState(null)
   const [imageContent, setImageContent] = React.useState([]);
   const [messageCombinate, setMessageCombinate] = React.useState([]);
   const [statusText, setStatusText] = React.useState(false);
   const [statusFile, setStatusFile] = React.useState(false);
   const [cursorPosition, setCursorPosition] = React.useState();
   const [message, setMessage] = useState([]);
   const userData = readLocalStorage(KEY_USER_DATA)

   const addContent = async (data) => {
      if (data) {
         const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
         const FormValue = new FormData();
         FormValue.append("medical_center",medical_center)
         FormValue.append("idchat_type", typeChat)
         FormValue.append("iddoctor", userData?.user?.id_doctor == undefined ? '': userData?.user?.id_doctor )
         FormValue.append("idprofessional",userData?.user?.id_professional == undefined? '': userData?.user?.id_professional)
         FormValue.append("send",mensajeTemp)
         FormValue.append("idsend_type","1")
         const resp = await chatService.createMessage(idChat,FormValue )
         if(resp){
            setMensajeTemp("")
         }
      }
   }


   const onChange = (e) => {
      e.preventDefault();
      setMensajeTemp(e?.target?.value || "");
   }

   const handleSubmit = () => {

   }

   const processImage  = async(event) => {
      if (event && event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
        const FormValue = new FormData();
         FormValue.append("medical_center",medical_center)
         FormValue.append("idchat_type", typeChat)
         FormValue.append("iddoctor", userData?.user?.id_doctor == undefined ? '': userData?.user?.id_doctor )
         FormValue.append("idprofessional",userData?.user?.id_professional == undefined? '': userData?.user?.id_professional)
         FormValue.append("send",file)
         FormValue.append("idsend_type","3")
         const resp = await chatService.createMessage(idChat,FormValue )
      }
   }

   const processFile = async(event) => {
      if (event && event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
         const FormValue = new FormData();
          FormValue.append("medical_center",medical_center)
          FormValue.append("idchat_type", typeChat)
          FormValue.append("iddoctor", userData?.user?.id_doctor == undefined ? '': userData?.user?.id_doctor )
          FormValue.append("idprofessional",userData?.user?.id_professional == undefined? '': userData?.user?.id_professional)
           FormValue.append("send",file)
          FormValue.append("idsend_type","2")
          const resp = await chatService.createMessage(idChat,FormValue )
      }
   }

   const Limpiar = () => {
      setMensajeTemp("")
      setImageContent([])
      setMessageCombinate([])
      setStatusText(false)
      setStatusFile(false)
      // setPrintRequestError('')
   }

   const onListMessage = async () =>{
     if(idChat)
     {
      const res:any = await chatService.getDetailMessage(idChat);
      if(res && res.data && res.data.detail)
      {
         setMessage(res.data.detail)
         props.$action.getMessagetChat(res.data.detail)
      }
     }
   }

   const sendMessage = (type, comentary) => {
      // if (type == "text" && !msg) {
      //   return;
      // }

      // if (type == "image" && !uploadImage) {
      //   console.log(uploadImage);
      //   return;
      // }

      // if (type == "file" && !uploadFile) {
      //   return;
      // }


    }

   React.useEffect(() => {
     if(open)
     {
      onListMessage()
     }
   }, [open]);

   // React.useEffect(() => {
   //    onListMessage()
   // }, [open]);

   const bodyModal = (
      <Box sx={{
         position: "absolute", top: "50%", left: "50%", transform: "translate(60%, -50%)", width: 450, height: 670,
         bgcolor: "background.paper", boxShadow: 24
      }}>
         <Grid item container xs={12} direction='row' justifyContent="space-between" alignItems={'center'} sx={{ bgcolor: '#28C4AC', px: 2, height: 70 }}>
            <Grid item container direction='row' alignItems={'center'} xs={11}>
               <ArrowBackIcon sx={{mr:1.5}} onClick={()=>{setOpen(false)}}/>
               <Avatar
                  alt="Remy Sharp"
                  src={logoknelaV2}
                  sx={{ width: 66, height: 66, mr: 2 }}
               />
              <Grid>
              <div style={{color:'#C22828', fontWeight:600,fontSize:'25px',marginBottom:'6px'}}>KNELA</div>
              <div style={{color:'#C22828',fontSize:'15px', marginBottom:'6px'}}>{typeChat == 2 ? dataCabecera.name : 'EQUIPO MÉDICO' }</div>
              {typeChat == 2 && <div style={{color:'#C22828',fontSize:'12px'}}>{dataCabecera.name_rol }</div>}
              </Grid>
            </Grid>
            {/* <Grid item container direction='row' xs={1}>
               <ExpandMoreIcon />
            </Grid> */}
         </Grid>
         <Grid item xs={12} md={12} sx={{ height: 550, bgcolor: '#F0F0F0' }} >
            {/* <List
                  sx={{
                      width: '100%',
                      maxWidth: 400,
                      bgcolor: 'background.paper',
                      position: 'relative',
                      overflow: 'auto',
                      maxHeight: 380,
                      '& ul': { padding: 0 },
                  }}>
                  <Card
                      sx={{
                          width: "100%",
                          background: "#f3f3f3",
                          borderRadius: "10px",
                      }}
                  >
                  </Card>
                  {messageCombinate?.map(e => {
                      return (
                          <Grid container spacing={2} sx={{ p: 2 }} justifyContent='left' >
                              <Card sx={{ width: "auto", borderRadius: "10px", background: "#f3f3f3", p: 2, justifyContent: 'center' }}>
                                  {e.message && <Typography>
                                      {e.message}
                                  </Typography>}
                                  {e.img && <a href={e.img} target="_blank">
                                      <img style={{ width: '50%', display: e.img ? 'flex' : 'none' }} src={e.img} />
                                  </a>}

                              </Card>
                          </Grid>
                      );
                  })
                  }
                  {statusText &&
                      <Grid container spacing={2} sx={{ p: 2 }} justifyContent='right' >
                          <Card sx={{ width: "50%", borderRadius: "10px", background: "#F5AEAD", p: 2, justifyContent: 'center', textAlign: 'left' }}>
                              <Typography>
                                  Solo se puede hacer un envio de texto
                              </Typography>
                          </Card>
                      </Grid>
                  }
                  {statusFile &&
                      <Grid container spacing={2} sx={{ p: 2 }} justifyContent='right' >
                          <Card sx={{ width: "50%", borderRadius: "10px", background: "#F5AEAD", p: 2, justifyContent: 'center', textAlign: 'left' }}>

                              <Typography>
                                  Solo se puede enviar una imagen
                              </Typography>
                          </Card>
                      </Grid>
                  }


              </List> */}
            <MainBody
            messages={MessageReducer && MessageReducer.messageChats ? MessageReducer.messageChats : []}
            user={{id: userData?.user?.id_doctor ? userData?.user?.id_doctor:  userData?.user?.id_professional}}
            />
         </Grid>
         <Grid container xs={12} display="flex" justifyContent="space-between" >
            <Grid item xs={12} >

               <Paper >
                  <Grid container xs={12} display="flex" justifyContent="space-between" alignItems="center">
                     <Grid item xs={1} >
                     <input style={{ display: 'none' }} id="upload-file" type="file" onChange={processFile}  />
                        <label htmlFor="upload-file">
                        <IconButton
                          component="span"
                          sx={{ p: "10px" }}>
                           <AttachFileIcon />
                        </IconButton>
                        </label>
                     </Grid>
                     <Grid item xs={1}>
                        <input style={{ display: 'none' }} id="upload-img" type="file" onChange={processImage} accept="image/*" />
                        <label htmlFor="upload-img">
                           <IconButton
                              component="span"
                              sx={{ p: "10px" }}>
                              <ImageIcon />
                           </IconButton>
                        </label>
                     </Grid>
                     <Grid item xs={9}
                        sx={{
                           overflow: 'auto',
                           maxHeight: 70,
                        }}>
                        <InputBase
                           sx={{ ml: 1, flex: 1 }}
                           // multiline
                           value={mensajeTemp}
                           onChange={onChange}
                           placeholder="Escribe un Mensaje"
                           name='mensaje'
                           id='mensaje'
                           spellCheck={true}
                           onKeyPress={event => { event.key === 'Enter' && addContent(mensajeTemp) }}
                        />
                     </Grid>
                     <Grid item xs={1} >
                        <IconButton
                           type="button"
                           sx={{ p: "10px" }}
                           aria-label="search"
                           onClick={(e) => { addContent(mensajeTemp) }}>
                           <SendIcon />
                        </IconButton>
                     </Grid>

                  </Grid>
               </Paper>
            </Grid>

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
      </div>
   );
}


const mapStateToProps = ({ MessageReducer}) => ({
      MessageReducer
});
const mapDispatchToProps = (dispatch) => ({
   $action: bindActionCreators(
      {
         getMessagetChat: getMessagetChat
      },
      dispatch
   ),
});


export const EquipoModal: any = compose(
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(EquipoModalView);
