import { createMuiTheme, ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material';
import React from 'react'
import { Props } from './InputForm.type'

import './InputForm.sass'

// const theme = createMuiTheme({
//    overrides: {
//       MuiInputBase: {
//          input: {
//             border: '1px solid #C4C4C4',
//             borderRadius: '5px',
//             padding: '15px 14px 14px',
//          },
//       },
//    }
// });

export const InputForm: React.FC<Props> = ({ multiline = false, placeholder, rows = 1, value, setValue, minWidth="250px"}) => {

   const handleChangeValue = (e: any) => {
      setValue(e.target.value);
   }

   return (
      // <ThemeProvider theme={theme}>
      <TextField
         value={value}
         onChange={handleChangeValue}
         InputProps={{
            disableUnderline: true
         }}
         placeholder={placeholder}
         multiline={multiline}
         rows={rows}
         style= {{minWidth}}
      />
   )
}
