export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginUserAction = (user) => ({
    type: LOGIN,
    payload: { user, isLoggedIn: true}

});

export const logOutUserAction = () => ({
    type: LOGOUT,
});
