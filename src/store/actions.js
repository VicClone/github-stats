export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginUserAction = () => ({
    type: LOGIN,
    payload: { isLoggedIn: true }
});

export const logOutUserAction = () => ({
    type: LOGOUT
});
