import React, { CSSProperties } from 'react';
import { memo, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { InputProps, InputState, InputValidationRule, InputValidationRules } from './InputInterfaces';
import { classNames } from '@toolbox/helpers/class-names';

import styles from './Input.module.sass';

const InputComponent: React.FC<InputProps> = React.forwardRef((props: InputProps, ref: React.Ref<unknown>) : JSX.Element => {
   const [state, setState] = useState<InputState>({
      isFocused     : false,
      isResetting   : false,
      isValid       : false,
      inputAnimation: false,
      hasInput      : false,
      hasFocused    : false,
      errorBucket   : [],
   });

   const inputRef = useRef<HTMLInputElement>(null);

   const genInternalMessages = (messages: string | InputValidationRules | undefined): InputValidationRules => {
      if (!messages) {
         return [];
      } else if (Array.isArray(messages)) {
         return messages;
      } else {
         return [messages];
      }
   }

   const internalErrorMessages   = useMemo(() => genInternalMessages(props.errorMessages), [props.errorMessages]);
   const internalSuccessMessages = useMemo(() => genInternalMessages(props.successMessages), [props.successMessages]);
   const internalMessages        = useMemo(() => genInternalMessages(props.messages), [props.messages]);
   const externalError           = useMemo(() => internalErrorMessages.length > 0 || props.error, [internalErrorMessages, props.error]);

   const shouldValidate = useMemo(() => {
      if (externalError) {
         return true;
      } else if (state.isResetting || props.readonly) {
         return false;
      }
      return props.validateOnBlur ? state.hasFocused && !state.isFocused : (state.hasInput || state.hasFocused);
   }, [externalError, state.isResetting, props.validateOnBlur, state.hasFocused, state.isFocused, state.hasInput, props.readonly]);

   const validationTarget = useMemo(() => {
      if (internalErrorMessages.length > 0) {
         return internalErrorMessages;
      } else if (internalSuccessMessages.length > 0) {
         return internalSuccessMessages;
      } else if (internalMessages.length > 0) {
         return internalMessages;
      } else if (shouldValidate) {
         return state.errorBucket;
      } else {
         return [];
      }
   }, [internalErrorMessages, internalSuccessMessages, internalMessages, shouldValidate, state.errorBucket]);

   const validations = useMemo(() => validationTarget.slice(0, Number(props.errorCount)), [validationTarget, props.errorCount]);
   const hasCounter  = useMemo(() => props.counter !== false, [props.counter]);
   const hasDetail   = useMemo(() => hasCounter || validationTarget.length > 0, [hasCounter, validationTarget]);
   const hasMessages = useMemo(() => validationTarget.length > 0, [validationTarget]);
   const hasSuccess  = useMemo(() => internalSuccessMessages.length > 0 || props.success, [internalSuccessMessages, props.success]);
   const hasError    = useMemo(() => internalErrorMessages.length > 0 || state.errorBucket.length > 0 || props.error, [
      internalErrorMessages,
      state.errorBucket,
      props.error
   ]);

   const hasHint = useMemo(() => !hasMessages && !!props.hint && (props.persistentHint || state.isFocused), [
      hasMessages,
      props.hint,
      props.persistentHint,
      state.isFocused,
   ]);

   const validationState = useMemo(() => {
      if (props.disabled) { return 'Disabled'; }
      if (hasError && shouldValidate) { return 'Error'; }
      if (hasSuccess) { return 'Success'; }
      return undefined;
   }, [props.disabled, hasError, shouldValidate, hasSuccess]);

   const memoMessages = useMemo(() => {
      if (hasHint) { return [props.hint]; }
      if (!hasMessages) { return []; }
      return validations.map((validation: string | InputValidationRule) => {
         if (typeof validation === 'string') {
            return validation;
         }
         const validationResult = validation(props.value);
         return typeof validationResult === 'string' ? validationResult : '';
      }).filter((message) => message !== '');
   }, [hasHint, hasMessages, validations]);

   const memoInputControlClass = useMemo(() => classNames({
      [styles.Elevation]     : !props.disableElevation,
      [styles.BorderColor]   : !props.disableBorderColor,
      [styles.Disabled]      : !!props.disabled,
      [styles.InputContainer]: true,
   }), [props.disableElevation, props.disableBorderColor, props.disabled]);

   const memoInputClass = useMemo(() => classNames({
      [styles.Input]: true,
      [styles.Shake]: state.inputAnimation,
      [styles.Dense]: !!props.dense,
   }), [state.inputAnimation, props.dense]);

   const memoStatusClass   = useMemo(() => classNames({ ...(validationState && { [`${styles[validationState]}`]: true }) }), [validationState]);
   const memoCounterValue  = useMemo(() => (props.value || '').toString().length, [props.value]);
   const memoCounterString = useMemo(() => {
      const type = typeof props.counter;
      const counter = type === 'string' ?
      !isNaN(parseInt(props.counter.toString(), 10)) ?
      parseInt(props.counter.toString(), 10) : false : props.counter;
      // !isNaN(parseInt(props.counter as unknown as string, 10)) ?
      // parseInt(props.counter as unknown as string, 10) : false : props.counter;

      return type === 'boolean' ?
      `${memoCounterValue}` : counter ?
      `${memoCounterValue}/${counter}` : ``;
   }, [props.counter, memoCounterValue]);

   const maxLengthProp = useMemo(() => ({ ...(props.maxLength && { maxLength: props.maxLength })}), [props.maxLength]);

   const styleObject = useMemo(() => ({
      ...(props.backgroundColor && { backgroundColor: props.backgroundColor }),
      ...(props.height && { height: props.height }),
   }), [props.backgroundColor, props.height]);

   const onChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
      !props.readonly && props.onChange && props.onChange(e);
   }

   const onFocusLocal = (e: React.FocusEvent<HTMLInputElement>) => {
      setState(prev => ({ ...prev, isFocused: true }));
      props.onFocus && props.onFocus(e);
   }

   const onBlurLocal = (e: React.FocusEvent<HTMLInputElement>) => {
      props.onBlur && props.onBlur(e);
      setState(prev => {
         let hasFocused = false
         if (!props.disabled) {
            hasFocused = true;
         }
         return { ...prev, hasFocused: prev.hasFocused || hasFocused, isFocused: false };
      });
   }

   const onLabelMouseDown = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
      e.preventDefault();
      inputRef.current?.focus();
   }

   const validate = (force = false, value?: any) => {
      value = value || props.value;
      force && setState(prev => ({ ...prev, hasInput: true, hasFocused: true}));
      // const errorBucket = (props.rules<InputValidationRules).reduce((prev, rule) => {
      const errorBucket = (props.rules).reduce((prev, rule) => {
         const valid = typeof rule === 'function' ? rule(value) : rule;
         if (valid === false || typeof valid === 'string') {
            return [ ...prev, (valid || '')];
         } else if (typeof valid !== 'boolean') {
            console.log(`rules should return a string or boolean, reviced ${typeof valid} instead`);
         }
         return prev;
      }, []);

      const isValid = errorBucket.length === 0;
      if (!props.value && !props.disableAnimation && !isValid && state.hasFocused) {
         setState(prev => ({ ...prev, inputAnimation: true}));
         setTimeout(() => {
            setState(prev => ({ ...prev, inputAnimation: false}));
         }, 500);
      }
      setState(prev => ({ ...prev, isValid, errorBucket }));
      return isValid;
   }

   const resetValidation = () => {
      setState(prev => ({ ...prev, isResetting: true }));
   }

   useImperativeHandle(ref, () => ({
      validate,
      resetValidation,
   }));

   useEffect(() => {
      validate();
   }, [props.rules]);

   useEffect(() => {
      setState(prev => ({
         ...prev,
         hasInput: false,
         hasFocused: false,
         isResetting: false,
      }))
      validate();
   }, [state.isResetting]);

   useEffect(() => {
      setState(prev => ({ ...prev, hasInput: true }));
      props.readonly || props.validateOnBlur || validate(false, props.value);
   }, [props.value]);

   useEffect(() => {
      !state.isFocused && !props.readonly && props.validateOnBlur && validate();
   }, [state.isFocused]);

   return (
      <div className={`${styles.Container} ${memoStatusClass} ${props.className || ''}`.trim()}>
         <label
            className={`${styles.Label} ${props.classes?.label || ''}`.trim()}
            onMouseDown={onLabelMouseDown}
         >
            {props.label}
         </label>
         <div className={styles.InputContent}>
            {
               props.prependAdornment &&
               <div className={`${styles.Adornment} ${styles.Prepend}`}>
                  {props.prependAdornment}
               </div>
            }
            <div className={styles.InputControl}>
               <div
                  className={memoInputControlClass}
                  style={styleObject}
               >
                  {
                     props.prependInnerAdornment &&
                     <div className={`${styles.Adornment} ${styles.PrependInner}`}>
                        {props.prependInnerAdornment}
                     </div>
                  }
                  <input
                     ref          = {inputRef}
                     className    = {memoInputClass}
                     id           = {props.id}
                     name         = {props.name}
                     placeholder  = {props.placeholder}
                     value        = {props.value}
                     onChange     = {onChangeLocal}
                     onFocus      = {onFocusLocal}
                     onBlur       = {onBlurLocal}
                     type         = {props.type}
                     autoComplete = {props.autocomplete ? 'on' : 'off'}
                     disabled     = {props.disabled}
                     readOnly     = {props.readonly}
                     autoFocus    = {props.autoFocus}
                  />
                     {/* {...maxLengthProp} */}
                  {
                     props.appendAdornment &&
                     <div className={`${styles.Adornment} ${styles.Append}`}>
                        {props.appendAdornment}
                     </div>
                  }
               </div>
               {
                  hasDetail &&
                  <div className={styles.Details}>
                     <div className={styles.Messages}>
                        {
                           memoMessages.map((message, i) => (
                              <p className={styles.Message} key={`${props.id || 'input'}-message-${i}`}>{message}</p>
                           ))
                        }
                     </div>
                     {
                        hasCounter &&
                        <div className={styles.Counter}>
                           <span>{memoCounterString}</span>
                        </div>
                     }
                  </div>
               }
            </div>
            {
               props.appendOuterAdornment &&
               <div className={`${styles.Adornment} ${styles.AppendOuter}`}>
                  {props.appendOuterAdornment}
               </div>
            }
         </div>
      </div>
   );
});

InputComponent.defaultProps = {
   type              : 'text',
   autocomplete      : false,
   autoFocus         : false,
   disableAnimation  : false,
   disableBorderColor: false,
   disabled          : false,
   persistentHint    : false,
   validateOnBlur    : false,
   readonly          : false,
   rules             : [],
   errorMessages     : [],
   successMessages   : [],
   messages          : [],
   errorCount        : 1,
   counter           : false,
}

export const Input = memo(InputComponent, (prevProps, nextProps) => {
   if (
      prevProps.className             !== nextProps.className ||
      prevProps.classes?.input        !== nextProps.classes?.input ||
      prevProps.classes?.label        !== nextProps.classes?.label ||
      prevProps.value                 !== nextProps.value ||
      prevProps.name                  !== nextProps.name ||
      prevProps.type                  !== nextProps.type ||
      prevProps.backgroundColor       !== nextProps.backgroundColor ||
      prevProps.placeholder           !== nextProps.placeholder ||
      prevProps.autocomplete          !== nextProps.autocomplete ||
      prevProps.autoFocus             !== nextProps.autoFocus ||
      prevProps.readonly              !== nextProps.readonly ||
      prevProps.disableAnimation      !== nextProps.disableAnimation ||
      prevProps.disableBorderColor    !== nextProps.disableBorderColor ||
      prevProps.disabled              !== nextProps.disabled ||
      prevProps.persistentHint        !== nextProps.persistentHint ||
      prevProps.validateOnBlur        !== nextProps.validateOnBlur ||
      prevProps.errorCount            !== nextProps.errorCount ||
      prevProps.counter               !== nextProps.counter ||
      prevProps.maxLength             !== nextProps.maxLength ||
      prevProps.height                !== nextProps.height ||
      prevProps.id                    !== nextProps.id ||
      prevProps.label                 !== nextProps.label ||
      prevProps.hideDetails           !== nextProps.hideDetails ||
      prevProps.disableElevation      !== nextProps.disableElevation ||
      prevProps.dense                 !== nextProps.dense ||
      prevProps.appendAdornment       !== nextProps.appendAdornment ||
      prevProps.appendOuterAdornment  !== nextProps.appendOuterAdornment ||
      prevProps.prependInnerAdornment !== nextProps.prependInnerAdornment ||
      prevProps.prependAdornment      !== nextProps.prependAdornment ||
      prevProps.hint                  !== nextProps.hint ||
      prevProps.error                 !== nextProps.error ||
      prevProps.success               !== nextProps.success ||
      prevProps.messages              !== nextProps.messages ||
      prevProps.successMessages       !== nextProps.successMessages ||
      prevProps.errorMessages         !== nextProps.errorMessages ||
      prevProps.rules                 !== nextProps.rules
   ) {
      return false;
   }
   return true;
});
