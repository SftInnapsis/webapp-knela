import React from 'react'
import { createMuiTheme, ThemeProvider } from '@mui/material'
import { Props } from './InputDatePicker.type'
import { DateTimePicker } from '@mui/lab'
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import DateFnsUtils from '@date-io/date-fns'
import { makeStyles, withStyles } from '@mui/styles';
import './InputDatePicker.sass'

const defaultMaterialTheme = createMuiTheme({

});

const CssDateTimePicker = withStyles({
   root: {
   '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
         borderColor: 'green',
      },
      '&.Mui-focused fieldset': {
         borderColor: 'green',
      },
   },
   },
})(DateTimePicker);

export const InputDatePicker: React.FC<Props> = ({ date, setDate, className, error, helperText}) => {

   const handleDateChange = (date: any) => {
      let year: number = date.getFullYear(),
      month: number = date.getMonth()+1,
      day: number = date.getDate(),
      hour: number = date.getHours(),
      minute: number = date.getMinutes(),
      second: number = date.getSeconds();
      let fechaFin: string = `${year}-${month<10?`0${month}`:month}-${day<10?`0${day}`:day} ${hour<10?`0${hour}`:hour}:${minute<10?`0${minute}`:minute}:${second<10?`0${second}`:second}`;
      setDate(fechaFin);
   }

   return (
      <ThemeProvider theme={defaultMaterialTheme}>
         {/* <LocalizationProvider dateAdapter={DateFnsUtils}>
            <CssDateTimePicker
               className={className}
               format="dd-MM-yyyy hh:mm aa"
               value={(date == '') ? null : date}
               placeholder={'25/06/2021 11:38:PM'}
               minDate={new Date()}
               onChange={handleDateChange}
               error={error}
               helperText={helperText}
               />
         </LocalizationProvider> */}
      </ThemeProvider>
   )
}
