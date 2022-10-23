export function moneyFormat (mount: number) {
   const mountCurrent = mount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   const value = '$ ' + mountCurrent
   return value
 }

 export function moneyFormatInt (mount: number) {
   const mountCurrent = mount.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   const value = '$ ' + mountCurrent
   return value
 }

