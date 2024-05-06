import Cookies from "js-cookie";

type CsrfAuth = "csrf_auth";

type Cookie = CsrfAuth;

// type GetCookieFunc = (name: Cookie) => string | undefined;

type GetCookieFunc = (name: Cookie) => Promise<string | undefined>;

type SetCookieFunc = (
  name: Cookie,
  value: string,
) => Promise<string | undefined>;

type RemoveCookieFunc = (name: Cookie) => void;

// export const getCookie: GetCookieFunc = (name) => {
//   const tokenCookie = Cookies.get(name);
//   return tokenCookie;
// };

export const getCookie: GetCookieFunc = async (name) => {
  return new Promise((resolve, reject) => {
    const cookie = Cookies.get(name);
    if (!cookie) return reject(cookie);
    return resolve(cookie);
  });
};

export const setCookie: SetCookieFunc = async (name, value) => {
  return new Promise((resolve, reject) => {
    const cookie = Cookies.set(name, value);
    if (!cookie) return reject(cookie);
    return resolve(cookie);
  });
};

export const removeCookie: RemoveCookieFunc = async (name) => {
  return new Promise((resolve, reject) => {
    if (!name) return reject(name);
    return resolve(Cookies.remove(name));
  });
};
