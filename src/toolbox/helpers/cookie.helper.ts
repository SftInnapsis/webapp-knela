import jsCookies, { CookieAttributes } from 'js-cookie';
import { Buffer } from 'browser-buffer';

const COOKIE_AUTH =  new Buffer(process.env.REACT_APP_KEY_COOKIE)
                    .toString('base64').replace(/=/g, '');
const SPLIT_DATA = '|';

const setCookie = (name: string, value: string, options?: CookieAttributes) => {
    const json = `${value}${SPLIT_DATA}${Date.now()}`;
    const encodedText = new Buffer(json).toString('base64');
    jsCookies.set(name, encodedText, options);
}
const removeCookie = (name: string) => {
    jsCookies.remove(name);
}
const readCookie = (name: string) => {
    let cookieValue = jsCookies.get(name);
    if(cookieValue !== undefined) {
        const decodedText = new Buffer(cookieValue, 'base64').toString('ascii')
        const parts = decodedText.split(SPLIT_DATA)
        const parsedValue = parts.length ? parts[0] : ''
        return parsedValue
    } else {
        return null;
    }
}

const setAuthCookie    = (value: string, options?: CookieAttributes) => setCookie(COOKIE_AUTH, value, options)
const removeAuthCookie = ()=> removeCookie(COOKIE_AUTH)
const readAuthCookie   = ()=> readCookie(COOKIE_AUTH)

export {
    setAuthCookie,
    removeAuthCookie,
    readAuthCookie
}