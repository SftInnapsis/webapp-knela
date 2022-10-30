import PropTypes from 'prop-types';
// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel,Typography} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
// ----------------------------------------------------------------------

// const visuallyHidden = {
//   border: 0,
//   margin: -1,
//   padding: 0,
//   width: '1px',
//   height: '1px',
//   overflow: 'hidden',
//   position: 'absolute',
//   whiteSpace: 'nowrap',
//   clip: 'rect(0 0 0 0)',
// };

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
  status_action,
  checkbox
}) {
  const createSortHandler = (property) => (event) => {
    console.log(property)
    console.log(event)
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkbox && <TableCell padding="checkbox" sx={{ bgcolor: '#F4F6F8' }} width={'50px'} align={'left'} >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ bgcolor: '#F4F6F8' }}
            width={headCell.width ? headCell.width : '230px'}
          >
            {/* <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}
           <Typography sx={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif !important',fontWeight:500}}> {headCell.label}</Typography>
            {/* {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null} */}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
        {
          status_action && (
            <TableCell padding="checkbox" sx={{ bgcolor: '#F4F6F8' }}>

            </TableCell>
          )
        }
      </TableRow>
    </TableHead>
  );
}
