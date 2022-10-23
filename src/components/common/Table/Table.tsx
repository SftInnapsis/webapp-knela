import React, { useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer,Typography, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { esES } from '@mui/material/locale';
import { VisibilityIcon, PencilIcon,DeleteIcon, MoreIcon,UsersIcon, DeleteRedIcon} from "@toolbox/constants/icons";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { indigo } from '@mui/material/colors';
import {useHistory} from 'react-router-dom'
import { moneyFormat } from '@/toolbox/helpers/money.helper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AddLinkIcon from '@mui/icons-material/AddLink';
import Tooltip from '@mui/material/Tooltip';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import TuneIcon from '@mui/icons-material/Tune';

type TableProps = {
    header: Array<any>,
    data: Array<any>,
    action?: Array<any>,
    RecuperarData?:(data) => void,
    Recuperarid?:(data) => void,
    perPage?:(perPage)=>void,
    page?:(page)=>void,
    total?: any,
    setAddOpen?:any,
    colorHeader?:any
}
export const TableData: React.FC<TableProps> = (
    props: TableProps

): JSX.Element => {
   const history= useHistory();
   const {colorHeader='#3f9bcc'} = props
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAction, setOpenAction] = useState(false);

    const theme = createTheme(
        {
            palette: {
                primary: { main: '#1976D2' },
            },
        },
        esES,
    );
   const nextPage = (toroute, row) => {
      switch(toroute){
         // case ROUTE_DETAILCAMPAIGNLEADSCLIENT :
         //    history.push(toroute, JSON.stringify(row));
         //    break;
         // case ROUTE_CAMPAIGN_GENERALES:
         //    history.push(`/campaña/generales/${row.id}`,{nombre_campana: row.nombre,cliente: null});
         //    break;
         // case ROUTE_DETAILCAMPAIGNGENERALCLIENT:
         //    history.push(toroute, JSON.stringify(row));
         //    break;
         default:
            history.push(toroute, row);
      }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if(props.page){
         props.page(newPage);
        }

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        if(props.perPage){
         props.perPage(+event.target.value)
        }

        setPage(0);
    };

    let recorrido = [];


    if(props.perPage || props.page){
      recorrido=props.data
    }else{
      recorrido=props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    }

    return (
        <>
            <TableContainer component={Paper} >
                <ThemeProvider theme={theme}>
                    <Table aria-label="simple table" >
                        <TableHead >
                        <TableRow sx={{ bgcolor:colorHeader}}>
                                {props.header.map((cell, i) => {
                                   return( <TableCell key={i} sx={{ color: 'white', fontSize:'1.1em' }} width={cell.width} ><strong>{cell.label}</strong></TableCell>

                                )})}

                                {props.action !== null ? (<TableCell align='center' sx={{ color: 'white' , fontSize:'1.1em' , minWidth:'8rem', maxWidth:'12rem'}}><strong>Acciones</strong></TableCell>
                                ) : null}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                              {
                              recorrido.map((data, id_data) => {
                               return (
                                <TableRow hover key={id_data} >
                                  {props.header.map((cabecera,id) => {
                                    const value = data[cabecera.name];
                                    if(cabecera.evento){
                                       return(
                                          <TableCell key={id}  sx={{background:id_data%2!=0?'#f3f3f3':'#fff'}}>
                                             <Button sx={{textTransform:'inherit', textAlign:'left'}} onClick={()=>{ props.RecuperarData({...data, action:"click"})}}
                                             >
                                                {value}
                                             </Button>
                                          </TableCell>
                                       )
                                    }
                                    if(cabecera.money)
                                    {
                                       return (
                                          <TableCell key={id} sx={{background:id_data%2!=0?'#f3f3f3':'#fff'}}>
                                            {value?moneyFormat(value):''}
                                          </TableCell>
                                        );
                                    }
                                    if(cabecera.integer)
                                    {
                                       return (
                                          <TableCell key={id} sx={{background:id_data%2!=0?'#f3f3f3':'#fff'}}>
                                            {value?parseInt(value):''}
                                          </TableCell>
                                        );
                                    }
                                    else{
                                       return (
                                          <TableCell key={id}  sx={{background:id_data%2!=0?'#f3f3f3':'#fff'}}>
                                            {value}
                                          </TableCell>
                                        );
                                    }
                                  })}
                                   {props.action?(
                                   <TableCell align='center' sx={{background:id_data%2!=0?'#f3f3f3':'#fff'}}>
                                       {props.action.map((ac:any,i:number) =>{
                                         const Name= ac["name"]
                                          switch (Name) {
                                             case 'delete':
                                                return (
                                                   <Tooltip title="Eliminar">
                                                   <Button key={i} onClick={()=>{props.RecuperarData(data)}}>
                                                      <DeleteRedIcon />
                                                   </Button>
                                                   </Tooltip>
                                                   );
                                             case 'edit':
                                                return (
                                                   <Tooltip title="Editar">
                                                <Button key={i} onClick={() => {
                                                   if(ac.route)
                                                   {
                                                      nextPage(ac.route,{...data, action:"edit"} )
                                                   }else
                                                   {
                                                      props.RecuperarData({...data, action:"edit"})
                                                   }
                                                }} >
                                                   <PencilIcon />
                                                </Button>
                                                </Tooltip>);
                                             case 'view':
                                                return (
                                                   <Tooltip title="Visualizar">
                                                <Button key={i} onClick={() => {
                                                   if(ac.route)
                                                   {
                                                      nextPage(ac.route,{...data, action:"view"} )
                                                   }else{
                                                      props.RecuperarData({...data, action:"view"})
                                                   }

                                                }}>
                                                   <VisibilityIcon />
                                                </Button>
                                                </Tooltip>);
                                             case 'add':
                                                return (
                                                   <Tooltip title="Agregar">
                                                   <Button key={i} onClick={() => {props.setAddOpen(true)}}>
                                                      <MoreIcon />
                                                   </Button>
                                                   </Tooltip>);
                                             case 'select':
                                             return (
                                                <Button key={i} onClick={() => {props.RecuperarData({...data, action:"select"})}}>
                                                   <AddCircleIcon />
                                                </Button>);
                                             case 'listUser':
                                                   return (<Button key={i} onClick={() => {
                                                      nextPage(ac.route,{...data, action:"listUser"} )
                                                   }}>
                                                      <UsersIcon/>
                                                   </Button>);
                                                   // case 'detailsProyection':
                                                   //  return (
                                                   //     <Button key={i} onClick={() => { setOpenProyection(true) }}>
                                                   //        Ver Detalles
                                                   //     </Button>);
                                             case 'detailsAction':
                                                return (
                                                   <Button key={i} onClick={() => { setOpenAction(true) }}>
                                                      Ver Detalles
                                                   </Button>);
                                             case 'asignar':
                                                if (data.idcliente) {
                                                   return;
                                                }
                                                return (
                                                   <Tooltip title="Enlazar Prospecto">
                                                   <Button key={i} onClick={() => {props.Recuperarid({...data, action:"asignar"})}}>
                                                      <AddLinkIcon />
                                                   </Button>
                                                   </Tooltip>)
                                                case 'move':
                                                   return (
                                                      <Tooltip title="Mover">
                                                      <Button key={i} onClick={() => {props.RecuperarData({...data, action:"move"})}}>
                                                         <CompareArrowsIcon />
                                                      </Button>
                                                      </Tooltip>);
                                                case 'nota':
                                                   return (
                                                      <Tooltip title="Nota">
                                                         <Button key={i} onClick={() => {props.RecuperarData({...data, action:"nota"})}}>
                                                            <NoteAltIcon />
                                                         </Button>
                                                      </Tooltip>);
                                                case 'cotizacion':
                                                   return (
                                                      <Tooltip title="Cotización">
                                                         <Button key={i} onClick={() => {props.RecuperarData({...data, action:"cotizacion"})}}>
                                                            <NoteAltIcon />
                                                         </Button>
                                                      </Tooltip>);
                                                case 'correo':
                                                   return (
                                                      <Tooltip title="Correo">
                                                         <Button key={i} onClick={() => {props.RecuperarData({...data, action:"correo"})}}>
                                                            <EmailIcon />
                                                         </Button>
                                                      </Tooltip>);
                                                case 'hilo_correo':
                                                   return (
                                                      <Tooltip title="Hilo de Correo">
                                                         <Button key={i} onClick={() => {props.RecuperarData({...data, action:"hilo_correo"})}}>
                                                            <MarkEmailUnreadIcon />
                                                         </Button>
                                                      </Tooltip>);
      						                        case 'sendMail':
                                                return (
                                                   <Tooltip title="Enviar landing por email">
                                                      <Button key={i} onClick={() => { props.RecuperarData({ ...data, action: "sendMail" }) }}>
                                                         <AttachEmailIcon />
                                                      </Button>
                                                   </Tooltip>);
                                                 case 'ResendPassword':
                                                   return (
                                                      <Tooltip title="Enviar accesos por email">
                                                         <Button key={i} onClick={() => { props.RecuperarData({ ...data, action: "ResendPassword" }) }}>
                                                            <ForwardToInboxIcon color='warning'/>
                                                         </Button>
                                                      </Tooltip>);
                                                case 'options':
                                                   return (
                                                      <Tooltip title="mailing">
                                                         <Button key={i} onClick={() => {props.RecuperarData({...data, action:"options"})}}>
                                                            <TuneIcon />
                                                         </Button>
                                                      </Tooltip>);
                                                 case 'correos enviados':
                                                   return (
                                                      <Tooltip title="correos enviados">
                                                         <Button key={i} onClick={() => {props.RecuperarData({...data, action:"correos enviados"})}}>
                                                            <TuneIcon />
                                                         </Button>
                                                      </Tooltip>);
                                        }
                                       })}
                                    </TableCell>):null}
                                </TableRow>
                              );
                            })}
                        </TableBody>

                    </Table>
                    <TablePagination
                        component="div"
                        count={props.total? props.total: props.data.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </ThemeProvider>
            </TableContainer>
        </>
    );
}
