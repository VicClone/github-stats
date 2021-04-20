import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../App';
import { logOutUserAction } from '../../store/actions';
import { AuthContextType } from '../../types/appTypes';
import { Container, Box } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import './Home.css';
import { sessionSaver } from '../../utils/SessionSaver';
import { UserData as UserDataGR } from './UserData';
import { ControlPointSharp } from '@material-ui/icons';

export const Home: React.FC = () => {
    const {
        state: { isLoggedIn },
        dispatch
    } = useContext<AuthContextType>(AuthContext);

    const [searchUserValue, setSearchUserValue] = useState<string>('');
    const [userLogin, setUserLogin] = useState<string>('');

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const handleSearch = (searchValue: string) => {
        setSearchUserValue(searchValue);
    };

    const searchUser = (searchUserValue: string) => {
        sessionSaver.setUserName(searchUserValue);
        setUserLogin(searchUserValue);
    };

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <SearchBar
                    value={searchUserValue}
                    onChange={value => handleSearch(value)}
                    onRequestSearch={() => searchUser(searchUserValue)}
                    cancelOnEscape
                />
            </Box>
            {userLogin && <UserDataGR searchValue={userLogin} />}
        </Container>
    );
};
