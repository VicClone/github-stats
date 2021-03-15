import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../App";
import { Redirect } from "react-router-dom";

export const Login: React.FC = () => {
    const { state, dispatch } = useContext<any>(AuthContext);
    const [data, setData] = useState({ errorMessage: "", isLoading: false });

    const { client_id, redirect_uri } = state;

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        if (hasCode) {
            const newUrl = url.split("?code=");
            window.history.pushState({}, '', newUrl[0]);
            setData({ ...data, isLoading: true });

            const requestData = {
                code: newUrl[1]
            };

            const proxy_url = state.proxy_url;

            fetch(proxy_url, {
                method: "POST",
                body: JSON.stringify(requestData)
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
    }, [state, dispatch, data]);

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
                            href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
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
