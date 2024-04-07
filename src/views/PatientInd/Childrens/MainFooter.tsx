import React, { useState, useMemo, useRef, useEffect } from 'react';
import "assets/styles/zendy-app.css";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from "emoji-picker-react";
// import ModalUploadImage from "components/Modals/ModalUploadImage";
// import { createMessage } from "services/actions/MessageAction";
// import { withRouter } from "react-router-dom";
// import ModalUploadFile from "components/Modals/ModalUploadFile";
// import { listActiveChats } from "services/actions/ChatAction";
import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";

type ModalProps = {
   open: boolean,
   setOpen: any,
   actionSelect?: string,
   recoveryData?: any,
   //    savePatientMaster?: ({ }) => void,
   //    editPatientMaster?: ({ }) => void,
}

export const MainFooter: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
   const { open, setOpen, actionSelect, recoveryData } = props
   const user_data = readLocalStorage(KEY_USER_DATA)

   const [mensajeTemp, setMensajeTemp] = useState<any>("")
   const [messageContent, setMessageContent] = useState([]);
   const [imageContent, setImageContent] = useState([]);
   const [messageCombinate, setMessageCombinate] = useState([]);
   const [statusText, setStatusText] = useState(false);
   const [statusFile, setStatusFile] = useState(false);

   const addContentText = (text) => {
       if (text) {
           const contador = messageContent.length;
           //----------------------------------------------------------------
           //Validar con el mensajeContent
           const obj = { key: `text${contador}`, value: text };
           if (contador < 1) {
               setMessageContent([...messageContent, obj])
               setMessageCombinate([
                   ...messageCombinate,
                   {
                       key: `text${contador}`,
                       message: text,
                       file: null,
                       img: null
                   }
               ])
               setMensajeTemp("")
           } else {
               setStatusText(true)
           }
       }
   }

   function addContentFile(file, fileUrl) {
       if (file && fileUrl) {
           const contador = imageContent.length;
           const obj = { key: `file${contador}`, value: file };
           if (contador < 1) {
               setImageContent([...imageContent, obj])
               setMessageCombinate([
                   ...messageCombinate,
                   {
                       key: `file${contador}`,
                       message: '',
                       file: file,
                       img: fileUrl
                   }
               ])
           } else {
               setStatusFile(true)
           }

       }
   }

   const onChange = (e) => {
       e.preventDefault();
       console.log(e?.target?.value)
       setMensajeTemp(e?.target?.value || "");
   }

   const handleSubmit = () => {

   }

   function processFile(event) {
       if (event && event.target.files && event.target.files.length > 0) {
           const file = event.target.files[0];
           const fileUrl = URL.createObjectURL(file);
           addContentFile(file, fileUrl)
       }
   }

   const Limpiar = () => {
       setMensajeTemp("")
       setMessageContent([])
       setImageContent([])
       setMessageCombinate([])
       setStatusText(false)
       setStatusFile(false)
       // setPrintRequestError('')
   }

  return (
      <Grid container xs={12} display="flex" justifyContent="space-between" >
              <Grid item xs={12} >
                  <Paper component="form" >
                      <Grid container xs={12} display="flex" justifyContent="space-between" alignItems="center">
                          <Grid item xs={10}
                              sx={{
                                  overflow: 'auto',
                                  maxHeight: 70,
                              }}>
                              <InputBase
                                  sx={{ ml: 1, flex: 1 }}
                                  multiline
                                  value={mensajeTemp}
                                  onChange={onChange}
                                  placeholder="Escribe un Mensaje"
                                  name='mensaje'
                                  id='mensaje'
                              />
                          </Grid>
                          <Grid item xs={1} >
                              <IconButton
                                  type="button"
                                  sx={{ p: "10px" }}
                                  aria-label="search"
                                  onClick={(e) => { addContentText(mensajeTemp) }}>
                                  <SendIcon />
                              </IconButton>
                          </Grid>
                          <Grid item xs={1}>
                              <input style={{ display: 'none' }} id="upload-file" type="file" onChange={processFile} accept="image/*" />
                              <label htmlFor="upload-file">
                                  <IconButton
                                      component="span"
                                      sx={{ p: "10px" }}>
                                      <AttachFileIcon />
                                  </IconButton>
                              </label>
                          </Grid>
                      </Grid>
                  </Paper>
              </Grid>

          </Grid>
  );
}
