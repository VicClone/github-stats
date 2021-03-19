import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import { Redirect } from 'react-router-dom';
import { getOauthAuthorizeLink } from '../utils/Oauth';
import { LOGIN, loginUserAction } from '../store/actions';
import { AuthContextType } from '../types/appTypes';
import { authenticate } from '../models/api';

export const Login: React.FC = () => {
    const {
        state: { clientId, redirectUri, proxyUrl, isLoggedIn },
        dispatch
    } = useContext<AuthContextType>(AuthContext);
    const [data, setData] = useState({ errorMessage: '', isLoading: false });

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes('?code=');

        if (hasCode) {
            window.history.pushState({}, '', '/login');
            setData({ ...data, isLoading: true });
            loginUser(url.split('?code=')[1]);
        }
    }, []);

    const loginUser = async (code: string) => {
        authenticate(proxyUrl, code).then(data => {
            if (data === 'isLoggedIn') {
                dispatch(loginUserAction());
            }
        });
    };

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <section className="container">
            <h1>Добро пожаловать</h1>
            <p className="content-container">
                Здесь можно посмотреть статистику гитхаба интересующего вас пользователя
            </p>
            {data.errorMessage && <span>{data.errorMessage}</span>}
            <div className="login-container">
                {data.isLoading ? (
                    <div className="loader-container">
                        <div className="loader">loading</div>
                    </div>
                ) : (
                    <a
                        className="login-link"
                        href={getOauthAuthorizeLink(clientId, redirectUri)}
                        onClick={() => {
                            setData({ ...data, errorMessage: '' });
                        }}
                    >
                        <span>Войти с помощью GitHub</span>
                    </a>
                )}
            </div>
        </section>
    );
};
