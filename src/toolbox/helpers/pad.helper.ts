export function pad (num: number, size: number): string {
   let newNumber = num.toString()
   while (newNumber.length < size) newNumber = '0' + newNumber

   return newNumber
 }
