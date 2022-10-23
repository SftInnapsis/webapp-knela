import React from 'react';
import { Select, MenuItem } from "@mui/material";

type SelectProps = {
   id?: string,
   variant?: "outlined",
   options: Array<any>,
   value?: any,
   placeholder?: string,
   label?: string,
   className?: string,
   onChange?: (e:any, option: any) => void,
   error: boolean | undefined,
   helperText: React.ReactNode
}

export const Selects: React.FC<SelectProps> = (
   props: SelectProps
) : JSX.Element => {
   return (
      <Select
         variant={props.variant}
         value={props.value}
         disableUnderline={true}
         onChange={props.onChange}
         error={props.error}
         placeholder={props.placeholder}
      >
         {
            props.options.map((row, i)=>(
               <MenuItem key={`format-option-${i}`} value={row.format_id}>{`${row.format_name} - ${row.code} - ${row.version}`}</MenuItem>
            ))
         }

      </Select>
   );
}
