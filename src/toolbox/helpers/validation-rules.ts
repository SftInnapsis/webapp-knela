export const RESPONSE = {
   REQUIRED       : 'Este campo es obligatorio.',
   PROPIETARIO    : 'No se permiten caracteres especiales',
   POINTS_IN_A_ROW: 'No se permite más de un punto seguido.',
   ONLY_LOWERCASE : 'Solo se permiten minúsculas.',
   ONLY_NUMBER    : 'Solo se permiten numeros.',
   PROMOTER_CODE  : 'Codigo incorrecto.',
   DNI            : 'DNI incorrecto.',
   NAME_CHARACTER : 'Solo se permite texto de A-Z',
   PHONE          : 'SU número debe tener mínimo 6 y máximo 9 digitos',
   WITHOUT_SPACE  : 'No se permite espacios',
   URL            : 'Su url debe tener el protocolo http o https antes del dominio y una extencion al final como ejemplo (.com)',
   PASSWORD       : {
      VALID: 'El campo debe ser una contraseña válida.',
      UPPERCASE: 'Su contraseña debe tener mayúsculas.',
      NUMBER: 'Su contraseña debe tener números.',
      CHARACTER: 'Su contraseña debe contener un carácter especial(@-_.+-*).',
      CHARACTER_ALLOWED: `Solo se permiten los siguientes caracteres:
      - Letras A-Z mayúscula o minúscula.
      - Números 0-9
      - Caracteres especiales: @ - _ punto + - *`,
      EQUALS: 'Las contraseñas no coinciden',
      SIMBOL: (simbol: RegExpMatchArray | string | null) =>
         `Este símbolo ${typeof simbol == 'string' ? simbol : simbol && simbol[0] ? simbol[0] : 'error'} no está permitido, puede utilizar los siguientes simbolos @, -, _, ., +, - y *`,
      SIZE : (min: number, max: number) =>
         `Su contraseña debe tener entre ${min} a ${max} caracteres.`,
   },
   EMAIL: {
      VALID: 'El campo debe ser un correo válido.',
      NAME_POINTS: 'No se permiten puntos al inicio y al final del nombre.',
      NAME_SIZE: (min: number, max: number) =>
         `Su correo debe tener mínimo de ${min} caracteres a ${max} caracteres antes del @`
   },
   RUC: 'El campo debe ser un RUC válido.',
   CHARACTER: (characters: string[]) =>
      characters.length > 1 ?
      `Solo se admiten los siguientes caracteres: ${characters.slice(0, -1).join(', ')} y ${characters.slice(-1)}` :
      `Solo se admite el siguiente caracter: ${characters[0]}`
   ,
   SIZE: (min: number, max: number) =>
      `El campo debe tener entre ${min} a ${max} caracteres.`,
   MIN_SIZE: (min: number) =>
      `El campo debe tener más de ${min} caracteres.`,
   MAX_SIZE: (max: number) =>
      `El campo debe tener menos de ${max} caracteres.`,

};

export const PATTERNS = {
   UPPERCASE      : /^(?=(?:.*[A-Z])).*$/,
   PROPIETARIO    : /^[a-zA-Z\t\h]+|(^$)/,
   LOWERCASE      : /^(?=(?:.*[a-z])).*$/,
   NUMBER         : /^(?=(?:.*\d)).*$/,
   ONLY_NUMBER    : /^([\d])+$/,
   POINTS_IN_A_ROW: /^(?=.*[.][.]+)\S*$/,
   PROMOTER_CODE  : /^[A-Z][A-Z]\d\d[039]\d$/,
   DNI            : /^[1-9][0-9]{7}$/,
   PHONE          : /^[\9][0-9]{6,8}$/,
   WITHOUT_SPACE  : /^[\S]*$/,
   URL            : /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{1,6})([\/\w \.-])\/?$/,
   NAME_CHARACTER : /^[A-Za-z\s]*$/,
   ADDRESS        : {
      NAME_CHARACTER: /^[\w\s#-]*$/,
      CHARACTER: /^[\w\s#,.-]*$/,
   },
   EMAIL    : {
      VALID      : /^[\w-][\w.-]{2,60}[\w-]@[\w-]{3,20}(\.[a-z-A-Z]{2,3}){1,2}$/,
      NAME_SIZE  : /^(?=.{4,60}@)\S*$/,
      NAME_POINTS: /^(?=\.)|(?=\S*\.@)\S*$/,
   },
   PASSWORD: {
      ALLOWED_CHARACTERS: /^[\w@.+*-]*$/,
      CHARACTER: /^(?=(?:.*[@_.+*-])).*$/,
      SIMBOL   : /[^\w@.+*-]/,
      VALID    : /[\w@.+*-]{8,15}/,
   },
   SIZE: (min: number, max: number) => new RegExp(`^.{${min},${max}}$`),
   MIN_SIZE: (min: number) => new RegExp(`^.{${min},}$`),
   MAX_SIZE: (max: number) => new RegExp(`^.{0,${max}}$`),
}

export const VALIDATORS = {
   REQUIRED      : (val: any) => !!val || RESPONSE.REQUIRED,
   ONLY_LOWERCASE: (val: any) => !PATTERNS.UPPERCASE.test(val) || RESPONSE.ONLY_LOWERCASE,
   DNI           : (val: any) => PATTERNS.DNI.test(val) || RESPONSE.DNI,
   NAME_CHARACTER: (val: any) => PATTERNS.NAME_CHARACTER.test(val) || RESPONSE.NAME_CHARACTER,
   PHONE         : (val: any) => PATTERNS.PHONE.test(val) || RESPONSE.PHONE,
   WITHOUT_SPACE : (val: any) => PATTERNS.WITHOUT_SPACE.test(val) || RESPONSE.WITHOUT_SPACE,
   URL           : (val: any) => PATTERNS.URL.test(val) || RESPONSE.URL,
   ADDRESS       : {
      CHARACTER     : (val: any) => PATTERNS.ADDRESS.CHARACTER.test(val) || RESPONSE.CHARACTER(['A-Z', '0-9', 'punto','- _', '#']),
      NAME_CHARACTER: (val: any) => PATTERNS.ADDRESS.NAME_CHARACTER.test(val) || RESPONSE.CHARACTER(['A-Z', '0-9', '- _', '#']),
      NAME_SIZE     : (val: any) => PATTERNS.SIZE(4, 15).test(val) || RESPONSE.SIZE(4,15),
      ADDRESS_SIZE  : (val: any) => PATTERNS.SIZE(10, 60).test(val) || RESPONSE.SIZE(10, 60),
      REFERENCE_SIZE: (val: any) => PATTERNS.SIZE(10, 120).test(val) || RESPONSE.SIZE(10, 120),
   },
   PROPIETARIO : (val: any) => PATTERNS.PROPIETARIO || RESPONSE.PROPIETARIO,
   EMAIL : {
      VALID          : (val: any) => PATTERNS.EMAIL.VALID.test(val) || RESPONSE.EMAIL.VALID,
      NAME_SIZE      : (val: any) => PATTERNS.EMAIL.NAME_SIZE.test(val) || RESPONSE.EMAIL.NAME_SIZE(4, 60),
      NAME_PONTS     : (val: any) => !PATTERNS.EMAIL.NAME_POINTS.test(val) || RESPONSE.EMAIL.NAME_POINTS,
      POINTS_IN_A_ROW: (val: any) => !PATTERNS.POINTS_IN_A_ROW.test(val) || RESPONSE.POINTS_IN_A_ROW,
   },
   CODE : {
      SIZE        : (val: any) => PATTERNS.SIZE(6, 15).test(val) || RESPONSE.SIZE(6, 15),
      ONLY_NUMBER : (val:any) => PATTERNS.ONLY_NUMBER.test(val) || RESPONSE.ONLY_NUMBER,
   },
   PASSWORD: {
      VALID    : (val: any) => PATTERNS.PASSWORD.VALID.test(val) || RESPONSE.PASSWORD.VALID,
      EQUALS   : ()  => RESPONSE.PASSWORD.EQUALS,
      UPPERCASE: (val: any) => PATTERNS.UPPERCASE.test(val) || RESPONSE.PASSWORD.UPPERCASE,
      NUMBER   : (val: any) => PATTERNS.NUMBER.test(val) || RESPONSE.PASSWORD.NUMBER,
      CHARACTER: (val: any) => PATTERNS.PASSWORD.CHARACTER.test(val) || RESPONSE.PASSWORD.CHARACTER,
      SIMBOL   : (val: any) => !PATTERNS.PASSWORD.SIMBOL.test(val) || RESPONSE.PASSWORD.SIMBOL((val).match(PATTERNS.PASSWORD.SIMBOL)),
      SIZE     : (val: any) => PATTERNS.SIZE(8, 15).test(val) || RESPONSE.PASSWORD.SIZE(8, 15),
      ALLOWED_CHARACTERS: (val: any) => PATTERNS.PASSWORD.ALLOWED_CHARACTERS.test(val) || RESPONSE.PASSWORD.CHARACTER_ALLOWED,
   },
   SIZE: (min: number, max: number) => ((val: any) => PATTERNS.SIZE(min, max).test(val) || RESPONSE.SIZE(min, max)),
   MIN_SIZE: (min: number) => ((val: any) => PATTERNS.MIN_SIZE(min).test(val) || RESPONSE.MIN_SIZE(min)),
   MAX_SIZE: (max: number) => ((val: any) => PATTERNS.MAX_SIZE(max).test(val) || RESPONSE.MAX_SIZE(max)),
   RUC: (val: any) => {
      const strRuc = val.toString();
      if (strRuc.length !== 11) return RESPONSE.RUC;

      const arrVals = ['10', '15', '16', '17', '20'];
      const initStr = strRuc.substring(0, 2);
      if (arrVals.indexOf(initStr) === -1) return RESPONSE.RUC;

      const charsRUC = strRuc.split('').reverse();
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

      return parseInt(charsRUC[0], 10) === checkDigit || RESPONSE.RUC;
   },
}
