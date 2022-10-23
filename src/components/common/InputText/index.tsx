import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { withStyles } from '@mui/styles';

const CssTextField = withStyles({
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
})(TextField);

export const InputText: React.FC<TextFieldProps> = (
   props : TextFieldProps
) : JSX.Element => {

   return (
      <CssTextField
         {...props}
      />
   );
}
