import React, { useEffect, useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer, Typography, TableHead, TablePagination, TableRow, Grid, Table,ButtonGroup, createTheme, ThemeProvider, Button, Container, Stack, Card, Checkbox, Avatar, IconButton, Popover, MenuItem, Chip, InputBase, Modal } from '@mui/material';
import { esES } from '@mui/material/locale';
import { VisibilityIcon, PencilIcon, DeleteIcon, MoreIcon, UsersIcon, DeleteRedIcon } from "@toolbox/constants/icons";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { indigo } from '@mui/material/colors';
import { useHistory } from 'react-router-dom'
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
import ListHeader from './ListHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Filter } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
// import Label from '@components/common/label'
// import { sentenceCase } from 'change-case';
import { Box } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

import SearchIcon from "@mui/icons-material/Search";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
type TableProps = {
   header?: Array<any>,
   data?: Array<any>,
   action?: Array<any>,
   RecuperarData?: (data) => void,
   Recuperarid?: (data) => void,
   perPage?: (perPage) => void,
   page?: (page) => void,
   actionSelect?: any,
   total?: any,
   setAddOpen?: any,
   colorHeader?: any,
   status_action?: boolean,
   title?: any,
   text_button_add?:any,
   text_eliminar?:any,
   checkbox?: boolean,
   setModalSave?:any,
   disabled_action_save?:boolean,
   select_button?:boolean,
   dataInitial?:any,
   dataSearch?:any,
   disabled_popover?:any,
   button_import?:any,
   ruta_import?:any,
   GenerateExportExcel?:any,
   setOpenImport?:any,
   openImport?:any,
   add_tutor_button?:any
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
   });
   if (query) {
      return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
   }
   return stabilizedThis.map((el) => el[0]);
}

export const TableDataV2: React.FC<TableProps> = (
   props: TableProps

): JSX.Element => {
   const history = useHistory();
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [dataSelected, setDataSelected] = useState<any>({});
   const [search, setSearch] = useState('');
   const nextPage = (toroute, row) => {
      history.push(toroute, row);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
      if (props.page) {
         props.page(newPage);
      }

   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      if (props.perPage) {
         props.perPage(+event.target.value)
      }

      setPage(0);
   };
   //////////////////////////////////////////
   const [open, setOpen] = useState(null);
   const [order, setOrder] = useState('asc');
   const [selected, setSelected] = useState<any>([]);
   const [orderBy, setOrderBy] = useState('name');
   const [filterName, setFilterName] = useState('');

   const handleOpenMenu = (event, data) => {

      setOpen(event.currentTarget);
      setDataSelected(data);
   };

   const handleCloseMenu = () => {
      setOpen(null);
   };

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };
   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = props.data.map((n) => n.name);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   const [saveFile, setSaveFile] = useState({
      name: '',
      path: '',
      preview: null,
      data: null
  });


   const changefile = (e) => {
      e.preventDefault()
      const file = e.target.files[0];
      if (!file) {
          return;
      }
      let src, preview, type = file.type;
      setSaveFile(prev => ({ ...prev, data: file, path: src, preview: preview }))
      console.log(file);
  }

   const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      // console.log(selectedIndex);
      let newSelected = [];
      if (selectedIndex === -1) {
         // console.log(selected)
         newSelected = newSelected.concat(selected, name);
         // console.log(newSelected)
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
   };

   const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      try{   const name = event.target.name;

         const value = event.target.value;
         // console.log(value)
           if(value.length>3)
               {
                  props?.dataSearch &&  props?.dataSearch(value)
               }
               if(value.length==0)
               {
                  props.dataInitial && props.dataInitial()
               }
               setSearch(value);


      }catch(e){
         // console.log(e)
      }
      };

   // const handleFilterByName = (event) => {
   //    setPage(0);
   //    setFilterName(event.target.value);
   // };

   // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   const filteredUsers = applySortFilter(props.data, getComparator(order, orderBy), filterName);
   let recorrido = [];
   if (props.perPage || props.page) {
      recorrido = filteredUsers;
   } else {
      recorrido = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
   }

   // const isNotFound = !filteredUsers.length && !!filterName;
   return (
      <>
         <Container>
            <Box
               sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  m: -1,
                  py: 3
               }}
            >
               <Typography
                  sx={{ m: 1 , fontWeight:600}}
                  variant="h4"
               >
                  {props.title}
               </Typography>


               <Box sx={{ m: 1 }}>
               {props?.button_import &&
               <>
               <Button
                  href={props?.ruta_import} target="_blank"
                  startIcon={(<DownloadIcon fontSize="small" />)}
                  sx={{ mr: 1 }}
               >
                  Descargar Plantilla
               </Button>
               <Button
                  startIcon={(<UploadIcon fontSize="small" />)}
                  sx={{ mr: 1 }}
                  onClick={()=>{props?.setOpenImport(true)}}
               >
                  Importar
               </Button>
               </>
               }
               {
               !props.disabled_action_save &&
               <Button
                  color="primary"
                  variant="contained"
                  onClick={()=>{props.setModalSave(true); props.actionSelect('save')}}
               >
                Agregar
               </Button>   }
            </Box>
            </Box>

            <Paper
                  // component="form"
                  sx={{ p: "0px 2px",mb:2, display: "flex" }}
                  // fullWidth
                  elevation={2}
               >
                  <InputBase
                     fullWidth
                      value={search}
                     onChange={handleInputSearch}
                     // on
                     sx={{ ml: 1, flex: 1 }}
                     placeholder="Buscador"
                  />
                  <IconButton type="button" aria-label="search">
                     <SearchIcon />
                  </IconButton>
               </Paper>
            <Card>
               {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
               {/* <Scrollbar> */}
               <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                     <ListHeader
                        order={order}
                        orderBy={orderBy}
                        headLabel={props.header}
                        rowCount={props.data.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                        status_action={props.status_action}
                        // checkbox={props.checkbox}
                        checkbox={false}
                     />
                     <TableBody>
                        {
                           recorrido.map((data, id_data) => {
                              const { id, name } = data;
                              const selectedUser = selected.indexOf(name) !== -1;
                              return (
                                 <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                    {/* {props.checkbox && <TableCell padding="checkbox">
                                       <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                                    </TableCell>} */}
                                    {props.header.map((cabecera, id) => {
                                       const value = data[cabecera.name];
                                       return (
                                          <TableCell key={id} align="center">
                                             <Grid container direction="row"
                                                justifyContent="center"
                                                alignItems="center">
                                                <Grid sx={{ pr: 1 }}>
                                                   {cabecera.avatar &&
                                                      <Avatar
                                                         alt="Remy Sharp"
                                                         src="http://view.k-nela.cl/assets/images/avatars/avatar_8.jpg"
                                                         sx={{ width: 30, height: 30 }}
                                                      />
                                                   }
                                                </Grid>
                                                <Grid sx={{ pl: 1 }}>
                                                   <Typography sx={{ fontFamily: '"Public Sans", sans-serif !important' }} variant='inherit' fontWeight={500}>
                                                      {/* {value} */}
                                                      {cabecera.name === 'status' ?
                                                   (
                                                      value == 1? 'ACTIVO': 'DESACTIVADO'
                                                   ):(value)
                                                   }
                                                   </Typography>
                                                </Grid>
                                             </Grid>
                                          </TableCell>
                                       )
                                    })}
                                    <TableCell align="center" >
                                       <ButtonGroup variant="contained" color="inherit" aria-label="button-group-custom-table" style={{ padding: "0px 5px" }}>
                                       {
                                           ! props?.disabled_popover &&
                                             <>
                                                <IconButton size="small" color="success" aria-label="view"
                                                    onClick={()=>{props.RecuperarData({...data,action:'edit'}); props.actionSelect('edit')}}
                                                >
                                                   <EditIcon fontSize='small' />
                                                </IconButton>
                                                <IconButton size="small" color="error" aria-label="view"
                                                onClick={()=>{props.RecuperarData({...data,action:'delete'})}}                                             >
                                                <DeleteOutlineIcon fontSize='small' />
                                             </IconButton>
                                             </>
                                          }
                                          {props.select_button &&
                                          <IconButton size="small" color="primary" aria-label="view"
                                          onClick={() => { props.RecuperarData({ ...data, action: 'seleccionar' }) }}
                                                >
                                                   <PanToolAltIcon fontSize='small' />
                                                </IconButton>
                                          }
                                          {
                                             props.add_tutor_button &&
                                             <IconButton size="small" color="primary" aria-label="view"
                                             onClick={() => { props.RecuperarData({ ...data, action: 'add_tutor' }) }}
                                                   >
                                                      <PersonAddAlt1Icon fontSize='small' />
                                                   </IconButton>
                                             // <TableCell align="center">
                                             //    <Button variant='outlined' color='primary' onClick={() => { props.RecuperarData({ ...data, action: 'add_tutor' }) }}>Agregar Tutor</Button>
                                             // </TableCell>
                                          }
                                       </ButtonGroup>
                                    </TableCell>

                                   {/* {props.select_button &&  <TableCell align="center">
                                       <Button variant='outlined' color='primary' onClick={() => { props.RecuperarData({...data, action:'seleccionar'}) }}>Seleccionar</Button>
                                    </TableCell>}
                                    {
                                       props.add_tutor_button &&
                                       <TableCell align="center">
                                       <Button variant='outlined' color='primary' onClick={() => { props.RecuperarData({...data, action:'add_tutor'}) }}>Agregar Tutor</Button>
                                    </TableCell>
                                    }
                                    <TableCell align="left" >
                                      {! props?.disabled_popover && <IconButton size="large" color="inherit" onClick={(e) => { handleOpenMenu(e, data) }}>
                                          <MoreVertIcon />
                                       </IconButton>}
                                    </TableCell> */}
                                 </TableRow>
                              );
                           })}
                     </TableBody>
                  </Table>
               </TableContainer>
               {/* </Scrollbar> */}

               <TablePagination
                  component="div"
                  count={props.total ? props.total : props.data.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 15]}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Card>
         </Container>

         <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
               sx: {
                  p: 1,
                  width: 140,
                  '& .MuiMenuItem-root': {
                     px: 1,
                     typography: 'body2',
                     borderRadius: 0.75,
                  },
               },
            }}
         >
            <MenuItem sx={{ alignItems: 'center' }} onClick={()=>{props.RecuperarData({...dataSelected,action:'edit'}); props.actionSelect('edit')}}>
               <EditIcon fontSize='medium' />
               Editar
            </MenuItem>

            <MenuItem sx={{ color: 'error.main', alignItems: 'center' }} onClick={()=>{props.RecuperarData({...dataSelected,action:'delete'})}}>
               <DeleteOutlineIcon fontSize='medium' />
               <Typography> {props?.text_eliminar || 'Eliminar'}</Typography>
            </MenuItem>
         </Popover>
         <Modal
         open={props?.openImport}
         onClose={() => { props?.setOpenImport(false) }}
         >
            <div className='Modal'>
            <div className='Title'>
            <Typography variant='h5' fontWeight={700}>
              {'Importar Datos'}
            </Typography>
          </div>
          <div className='Body'>
          <form>
                            <Typography
                                textAlign="center"
                                variant="h6"
                                id="transition-modal-title"
                                sx={{ color: "#000", fontWeight: "bold" }}
                            >

                            </Typography>
                            <Grid container  justifyContent="center">
                                <Grid container  mt={2}>

                                    <Grid item xs={6} mt={2}>
                                        <Grid item xs={12} sx={{ position: 'relative' }}>
                                            <div className="wrapper">
                                                <div className="file-upload"
                                                // style={{background:color}}
                                                >
                                                    {/* <UploadIcon /> */}
                                                    {/* <span style={{ fontSize: '15px' }}>CARGAR</span> */}
                                                    <input type="file"
                                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                                        onChange={changefile}
                                                    />
                                                </div>
                                            </div>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} mt={3}>
                                    <Button fullWidth
                                        variant='contained'
                                        onClick={() => { props?.GenerateExportExcel(saveFile); props?.setOpenImport(false) }}>
                                        Importar Excel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
          </div>

            </div>
         </Modal>
      </>
   );
}
