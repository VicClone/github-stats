import React, { useContext } from 'react';
import './Header.css';
import { Link } from '@material-ui/core';
import { logOutUserAction } from '../../store/actions';
import { AuthContextType } from '../../types/appTypes';
import { AuthContext } from '../../App';
import { Link as LinkRouter } from 'react-router-dom';

export const Header = () => {
    const {
        state: { isLoggedIn },
        dispatch
    } = useContext<AuthContextType>(AuthContext);

    const handleLogOut = () => {
        dispatch(logOutUserAction());
    };

    return (
        <header className="header-position">
            <LinkRouter to="/" className="header-font">
                Гитстатистика
            </LinkRouter>
            {isLoggedIn && (
                <Link className="header-link" href="/login" onClick={handleLogOut}>
                    Выйти
                </Link>
            )}
        </header>
    );
};
