export function isValidEmail(email: string) {
   const emailPattern = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

   return emailPattern.test(email)
}

export function isValidDni(dni: string) {
   if (dni != '') {
      const dniPattern = /^[0-9]+$/
      return dniPattern.test(dni) && dni.length === 8
   }
   else {
      return false
   }
}

export function isNumber(number: string) {
   if (number !== '') {
      const numberPattern = /^[0-9]+$/;
      return numberPattern.test(number);
   }
   else {
      return false;
   }
}

// http://www.excelnegocios.com/validacion-de-rucs-sunat-peru-sin-internet-algoritmo/
export function isValidRuc(ruc: string) {
   const strRuc = ruc.toString();
   if (strRuc.length !== 11) return false;

   const arrVals = ['10', '15', '16', '17', '20'];
   const initStr = strRuc.substring(0, 2);
   if (arrVals.indexOf(initStr) === -1) return false;

   const charsRUC  = strRuc.split('').reverse();
   const minFactor = 2;
   const mulFactor = 7;

   let currentFactor = 2;
   let sum = 0;

   for (let i = 1; i < 11; i++) {
      sum += parseInt(charsRUC[i], 10) * currentFactor;
      if (currentFactor === mulFactor) {
         currentFactor = minFactor;
      } else {
         currentFactor++;
      }
   }

   let checkDigit = 11 - (sum % 11);
   switch (checkDigit) {
      case 10:
         checkDigit = 0;
         break;
      case 11:
         checkDigit = 1;
         break;
   }

   return parseInt(charsRUC[0], 10) === checkDigit;
}
