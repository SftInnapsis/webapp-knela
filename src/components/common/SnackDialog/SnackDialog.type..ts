type SnackDialogProps = {
   ref: any,
   onConfirm?: () => void,
   onClose?: (data?: any) => void
}

export type SnackVariant = 'error' | 'info' | 'warning' | 'success'
export type RefObject = {
   showDialog(variant: SnackVariant, title: string, description: string) : void
}

export type Props = SnackDialogProps;
