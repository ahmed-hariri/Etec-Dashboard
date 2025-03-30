import Cookies from 'js-cookie';

export const setAuthToken = (cookiesData: string) => {
    Cookies.set("token", cookiesData, {
        expires: 7,
        secure: window.location.protocol === 'https:', // Ensure the protocol is HTTPS
        sameSite: 'None', // Allow cookies across sites
    });
}