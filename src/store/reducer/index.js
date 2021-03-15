export const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
    user: JSON.parse(localStorage.getItem("user")) || null,
    client_id: '565961dd48bbbc37fb09',
    redirect_uri: 'http://localhost:3000/login',
    client_secret: '2f19d68e4ac90318773e926beade8ae4e440346b',
    proxy_url: 'http://localhost:5000/authenticate'
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
            localStorage.setItem("user", JSON.stringify(action.payload.user))
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user
            };
        }
        case "LOGOUT": {
            localStorage.clear();
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        default:
            return state;
    }
};
