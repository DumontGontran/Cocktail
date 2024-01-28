import Axios from 'src/_services/caller.service';
import jwt_decode from 'jwt-decode';

let login = (credentials) => {
    return Axios.post('/auth/login', credentials);
};
let saveToken = (token) => {
    localStorage.setItem('token', token);
};

let logout = () => {
    localStorage.removeItem('token');
};

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
};

let getToken = () => {
    return localStorage.getItem('token');
};

let getTokenInfo = () => {
    return jwt_decode(getToken());
};

export const accountService = {
    login, saveToken, logout, isLogged, getToken, getTokenInfo
}