import React, { useState } from 'react';
import { Paper, TableBody, TableCell, TableContainer, Typography, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button, Container, Stack, Card, Checkbox, Avatar, IconButton, Popover, MenuItem, Chip } from '@mui/material';
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

type TableProps = {
   header?: Array<any>,
   data?: Array<any>,
   action?: Array<any>,
   RecuperarData?: (data) => void,
   Recuperarid?: (data) => void,
   perPage?: (perPage) => void,
   page?: (page) => void,
   total?: any,
   setAddOpen?: any,
   colorHeader?: any
}

const TABLE_HEAD = [
   { id: 'name', label: 'Name', alignRight: false },
   { id: 'company', label: 'Company', alignRight: false },
   { id: 'role', label: 'Role', alignRight: false },
   { id: 'isVerified', label: 'Verified', alignRight: false },
   { id: 'status', label: 'Status', alignRight: false },
   { id: '' },
];

const USERLIST = [
   { name: 'aldair' },
   { name: 'company' },
   { name: 'role' },
   { name: 'isVerified' },
   { name: 'status' },
   { name: 'xd' },
   { name: 'aldair' },
   { name: 'company' },
   { name: 'role' },
   { name: 'isVerified' },
   { name: 'status' },
   { name: 'xd' },
   { name: 'aldair' },
   { name: 'company' },
   { name: 'role' },
   { name: 'isVerified' },
   { name: 'status' },
   { name: 'xd' },
];

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
   console.log(array);
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
   const [selected, setSelected] = useState([]);
   const [orderBy, setOrderBy] = useState('name');
   const [filterName, setFilterName] = useState('');

   const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
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
         const newSelecteds = USERLIST.map((n) => n.name);
         setSelected(newSelecteds);
         return;
      }
      setSelected([]);
   };

   const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
   };


   const handleFilterByName = (event) => {
      setPage(0);
      setFilterName(event.target.value);
   };

   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

   const filteredUsers = applySortFilter(props.data, getComparator(order, orderBy), filterName);
   let recorrido = [];
   if (props.perPage || props.page) {
      recorrido = filteredUsers;
   } else {
      recorrido = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
   }

   const isNotFound = !filteredUsers.length && !!filterName;
   return (
      <>
         <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
               <Typography variant="h4" gutterBottom>
                  Usuarios
               </Typography>
               {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
            </Stack>

            <Card>
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
                     />
                     <TableBody>
                        {
                           recorrido.map((data, id_data) => {
                              return (
                                 <TableRow hover key={id_data} >
                                    {props.header.map((cabecera, id) => {
                                       const value = data[cabecera.name];
                                       if (cabecera.evento) {
                                          return (
                                             <TableCell key={id} sx={{ background: id_data % 2 != 0 ? '#f3f3f3' : '#fff' }}>
                                                <Button sx={{ textTransform: 'inherit', textAlign: 'left' }} onClick={() => { props.RecuperarData({ ...data, action: "click" }) }}
                                                >
                                                   {value}
                                                </Button>
                                             </TableCell>
                                          )
                                       }
                                       if (cabecera.money) {
                                          return (
                                             <TableCell key={id} sx={{ background: id_data % 2 != 0 ? '#f3f3f3' : '#fff' }}>
                                                {value ? moneyFormat(value) : ''}
                                             </TableCell>
                                          );
                                       }
                                       if (cabecera.integer) {
                                          return (
                                             <TableCell key={id} sx={{ background: id_data % 2 != 0 ? '#f3f3f3' : '#fff' }}>
                                                {value ? parseInt(value) : ''}
                                             </TableCell>
                                          );
                                       }
                                       else {
                                          return (
                                             <TableCell key={id} sx={{ background: id_data % 2 != 0 ? '#f3f3f3' : '#fff' }}>
                                                {value}
                                             </TableCell>
                                          );
                                       }
                                    })}
                                    {props.action ? (
                                       <TableCell align='center' sx={{ background: id_data % 2 != 0 ? '#f3f3f3' : '#fff' }}>
                                          {props.action.map((ac: any, i: number) => {
                                             const Name = ac["name"]
                                             switch (Name) {
                                                case 'delete':
                                                   return (
                                                      <Tooltip title="Eliminar">
                                                         <Button key={i} onClick={() => { props.RecuperarData(data) }}>
                                                            <DeleteRedIcon />
                                                         </Button>
                                                      </Tooltip>
                                                   );
                                                case 'ResendPassword':
                                                   return (
                                                      <Tooltip title="Enviar accesos por email">
                                                         <Button key={i} onClick={() => { props.RecuperarData({ ...data, action: "ResendPassword" }) }}>
                                                            <ForwardToInboxIcon color='warning' />
                                                         </Button>
                                                      </Tooltip>);
                                             }
                                          })}
                                       </TableCell>) : null}
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
            <MenuItem>
               {/* <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> */}
               Edit
            </MenuItem>

            <MenuItem sx={{ color: 'error.main' }}>
               {/* <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> */}
               Delete
            </MenuItem>
         </Popover>
      </>
   );
}
