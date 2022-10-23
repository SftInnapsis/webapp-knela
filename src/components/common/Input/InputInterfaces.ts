import { ReactNode } from "react";

export interface InputProps {
   ref: any;
   className?: string;
   classes?: InputClasses;
   value?: string;
   name?: string;
   type?: string;
   backgroundColor?: string;
   placeholder?: string;
   autocomplete?: boolean;
   autoFocus?: boolean;
   disableAnimation?: boolean;
   disableBorderColor?: boolean;
   disabled?: boolean;
   persistentHint?: boolean;
   validateOnBlur?: boolean;
   errorCount?: string | number;
   counter?: boolean | string | number;
   maxLength?: number | string;
   height?: string | number;
   id?: string;
   label?: string;
   hideDetails?: boolean;
   disableElevation?: boolean;
   dense?: boolean;
   appendAdornment?: ReactNode;
   appendOuterAdornment?: ReactNode;
   prependInnerAdornment?: ReactNode;
   prependAdornment?: ReactNode;
   hint?: string;
   error?: boolean;
   success?: boolean;
   messages?: string | InputValidationRules;
   successMessages?: string | InputValidationRules;
   errorMessages?: string | InputValidationRules;
   rules?: InputValidationRules;
   readonly?: boolean;
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
   onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface InputState {
   isFocused: boolean;
   isResetting: boolean;
   isValid: boolean;
   inputAnimation: boolean;
   hasInput: boolean;
   hasFocused: boolean;
   errorBucket: string[];
}

interface InputClasses {
   label?: string;
   input?: string;
}

export interface InputRef {
   validate: (force?: boolean, value?: any) => boolean;
   resetValidation: () => void;
}

export type InputValidationRule = (value: any) => string | boolean;
export type InputValidationRules = Array<string | InputValidationRule>;
