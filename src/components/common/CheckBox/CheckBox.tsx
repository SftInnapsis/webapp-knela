import { Checkbox, FormControlLabel, Theme } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';
import clsx from "clsx";
import { CheckboxProps } from "./CheckBox.type";

const useStyles = makeStyles((theme: Theme) => ({
   root: {
      margin: "0 0 25px",
      width: "fit-content",
   },
   labelForm: {
      fontSize: 15,
      fontWeight: "normal",
      color: "#313131",
   },
   checkbox: {
      padding: 0,
      marginRight: 14,
   },
   icon: {
      borderRadius: 5,
      width: 24,
      height: 24,
      border: "1px solid #C4C4C4",
      backgroundColor: "#f5f8fa",
      boxSizing: "border-box",
      "$root.Mui-focusVisible &": {
         outline: "2px auto rgba(119, 182, 55, .6)",
         outlineOffset: 2,
      },
      "input:disabled ~ &": {
         boxShadow: "none",
         background: "rgba(204, 204, 204,1)",
      },
   },
   checkedIcon: {
      backgroundColor: "#77B637",
      "&:before": {
         display: "block",
         width: 24,
         height: 24,
         backgroundImage:
         "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='1 1 16 16'%3E%3Cpath" +
         " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
         "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
         content: '""',
      },
   },
}));

export const CheckBox: React.FC<CheckboxProps> = ({
   label,
   checked,
   disabled,
   onChange,
}) => {
   const styles = useStyles();

   return (
      <FormControlLabel
         className={styles.root}
         control={
         <Checkbox
            checked={checked}
            onChange={onChange}
            name="checked"
            className={styles.checkbox}
            disabled={disabled}
            checkedIcon={
               <span className={clsx(styles.icon, styles.checkedIcon)} />
            }
            icon={<span className={styles.icon} />}
         />
         }
         label={<span className={styles.labelForm}>{label}</span>}
      />
   );
};
