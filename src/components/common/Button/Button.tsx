import React, { CSSProperties } from 'react';
import './Button.sass';

type ButtonProps = {
   text: string | React.ReactNode,
   type?: 'button' | 'submit',
   typeStatus?: string,
   styleButton: string,
   style?: CSSProperties,
   action?: () => void,
   disabled?: boolean
}

export const ButtonComponent : React.FC<ButtonProps> = (
   props: ButtonProps
) : JSX.Element => {

   return (
      <button
         className={
            (props.styleButton == 'outlined-small') ? 'c-button-outlined-small'
               : (props.styleButton == 'outlined-large') ? 'c-button-outlined-large'
                  : (props.styleButton == 'contained') ?'c-button-contained'
                        : 'c-button-contained-action'
         }
         type={props.type}
         disabled={props.disabled}
         style={props.style}
         datatype={props.typeStatus}
         onClick={props.action}> {props.text} </button>
   );
}

ButtonComponent.defaultProps = {
   type : 'button',
   disabled: false
}
