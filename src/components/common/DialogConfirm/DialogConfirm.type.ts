type DialogConfirmProps = {
   open?: boolean,
   title?: string,
   message?: string,
   type?: 'button'|'submit',
   textConfirm?: string,
   onConfirm?: () => void,
   onClose?: () => void,
   content?: any,
   children?: any,
}

export type Props = DialogConfirmProps;
