import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";


export const Home: React.FC = () => {
    const { state, dispatch } = useContext<any>(AuthContext);

    if (!state.isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const { userName } = state;

    const handleLogout = (): void => {
        dispatch({
            type: "LOGOUT"
        });
    }

    return (
        <div className="container">
            <div>
                <button onClick={()=> handleLogout()}>Logout</button>
            </div>
            <div>
                <div className="content-container">
                    <span>{userName}</span>
                </div>
            </div>
        </div>
    );
}
