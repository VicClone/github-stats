import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../App";
import { Redirect } from "react-router-dom";
import { getOauthLink } from "../Oauth";

export const Login: React.FC = () => {
    const { state, dispatch } = useContext<any>(AuthContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { clientId, redirectUri, proxyUrl } = state;

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        if (hasCode) {
            window.history.pushState({}, '', '/login');
            setData({...data, isLoading: true});
            loginUser(url.split("?code=")[1]);
        }
    }, [state, dispatch, data]);

    const loginUser = (code: string): void => {
        fetch(proxyUrl, {
            method: "POST",
            body: JSON.stringify({ code })
        })
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: "LOGIN",
                    payload: { user: data, isLoggedIn: true }
                });
            })
            .catch(error => {
                setData({
                    isLoading: false,
                    errorMessage: "Sorry! Login failed"
                });
            });
    }

    if (state.isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <section className="container">
            <h1>Добро пожаловать</h1>
            <p className="content-container">Здесь можно посмотреть статистику гитхаба интересующего вас пользователя</p>
            <span>{data.errorMessage}</span>
            <div className="login-container">
                {data.isLoading ? (
                    <div className="loader-container">
                        <div className="loader">loading</div>
                    </div>
                ) : (
                    <>
                        <a
                            className="login-link"
                            href={getOauthLink(clientId, redirectUri)}
                            onClick={() => {
                                setData({ ...data, errorMessage: "" });
                            }}
                        >
                            <span>Войти с помощью GitHub</span>
                        </a>
                    </>
                )}
            </div>
        </section>
    );
}
