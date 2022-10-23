import { pad } from './pad.helper'
// export function ddmmyyyy_hms (date, split = '',hms = '') {
//     var mm = date.getMonth() + 1; // getMonth() is zero-based
//     var dd = date.getDate();
//     var h  = date.getHours();
//     var pr = (h>12 ? h-12: h);
//     var m  = date.getMinutes();
//     var s  = date.getSeconds();

//     return [date.getFullYear(),
//         (mm>9 ? '' : '0') + mm,
//         (dd>9 ? '' : '0') + dd
//     ].reverse().join(split)+(!!hms ? ' '+hms+' ' : ' ')+[
//         (pr>9 ? '' : '0') + pr,
//         (m>9 ? '' : '0') + m,
//         (s>9 ? '' : '0') + s,
//     ].join(':')+ ' '+(h>=12 ? 'pm': 'am');
// };

export function dateFormat (date: string): string {
   const newDate = new Date(date)
   if (!isNaN(newDate.getDate()) && !isNaN(newDate.getMonth()) && !isNaN(newDate.getFullYear())) {
      const day = newDate.getDate()
      const month = newDate.getMonth() + 1
      const year = newDate.getFullYear()
      const abbreviatedYear = year.toString().slice(-2)

      //return `${pad(day, 2)}/${pad(month, 2)}/${abbreviatedYear}`
      return `${year}-${pad(month, 2)}-${pad(day, 2)}`
   }
   return '--/--/--'
}

export function dateFormatTime (date: string): string | null {
   const newDate = new Date(date)
   if (!isNaN(newDate.getDate()) && !isNaN(newDate.getMonth()) && !isNaN(newDate.getFullYear())) {
      const hours = newDate.getHours()
      const minutes = newDate.getMinutes()

      return `${pad(hours, 2)}:${pad(minutes, 2)}`
   }
   return null
}
