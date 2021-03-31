import React, { useContext } from 'react';
import './Header.css';
import { Link } from '@material-ui/core';
import { logOutUserAction } from '../../store/actions';
import { AuthContextType } from '../../types/appTypes';
import { AuthContext } from '../../App';

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
            <p className="header-font">Гитстатистика</p>
            {isLoggedIn && (
                <Link className="header-link" href="/login" onClick={handleLogOut}>
                    Выйти
                </Link>
            )}
        </header>
    );
};
