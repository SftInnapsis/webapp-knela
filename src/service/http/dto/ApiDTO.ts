export type Status = {
   code: number,
   message: string
}

export type ApiDTO = {
   data?: any,
   status: Status,
   error?: Status | any,
   message: string,
   timestamp: string
}
