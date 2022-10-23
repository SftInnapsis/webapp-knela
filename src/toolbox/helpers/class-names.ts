export function classNames(classoObject: object) {
   return Object.entries(classoObject)
      .filter(([attr, value]) => value)
      .map(([attr, value]) => attr)
      .join(' ');
}
