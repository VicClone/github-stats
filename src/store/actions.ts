import { UserData } from '../types/apiTypes';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_SEARCHED_USER = 'SET_SEARCHED_USER';

export const loginUserAction = () => ({
    type: LOGIN,
    payload: { isLoggedIn: true }
});

export const logOutUserAction = () => ({
    type: LOGOUT
});

export const setSearchedUser = (searchedUser: UserData) => ({
    type: SET_SEARCHED_USER,
    payload: { searchedUser }
});
