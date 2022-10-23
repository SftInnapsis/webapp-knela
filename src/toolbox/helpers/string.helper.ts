export function padString(
    num: number,digits: number = 1,pad: any = 0
): string {
    let str    = (""+num);
    let length = Math.max(digits-str.length,0);
    return (Array(length+1).join(pad) + str);
}