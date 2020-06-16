import * as utils from "./utils";

const parsedUrl = utils.parseURL(window.location.href);
console.log(parsedUrl);

// remove last "/" from path
const path = parsedUrl.pathname.substring(0,parsedUrl.pathname.length - 1);

console.log(path);
console.log(`${parsedUrl.protocol}//${parsedUrl.host}${path}`);

export const baseURL = `${parsedUrl.protocol}//${parsedUrl.host}${path}/api`;
export const cryptoSecret="ajs0k0fCxp";
export const baseRouteURL = path;

/*
export const baseURL = "http://jw-dev1.cloudmin.anu.net/api";
export const cryptoSecret="ajs0k0fCxp";
*/
