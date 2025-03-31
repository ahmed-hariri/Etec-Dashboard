import Cookies from 'js-cookie';

export const setAuthToken = (cookiesData: string) => {
    Cookies.set("token", cookiesData, { expires: 7, secure: true, sameSite: "None" });
}