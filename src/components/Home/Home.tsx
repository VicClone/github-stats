import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../App';
import { AuthContextType } from '../../types/appTypes';
import { Container, Box } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import './Home.css';
import { sessionSaver } from '../../utils/SessionSaver';
import { UserData as UserDataGR } from './UserData';

export const Home: React.FC = () => {
    const {
        state: { isLoggedIn }
    } = useContext<AuthContextType>(AuthContext);

    const [searchUserValue, setSearchUserValue] = useState<string>('');
    const [userLogin, setUserLogin] = useState<string>('');
    const history = useHistory();
    const { searched } = useParams<{ searched: string }>();

    useEffect(() => {
        setSearchUserValue(searched);
        searchUser(searched);
    }, [searched]);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const handleSearch = (searchValue: string) => {
        setUserLogin('');
        setSearchUserValue(searchValue);
    };

    const onSearch = (searchUserValue: string) => history.push(searchUserValue);

    const searchUser = (searchUserValue: string) => {
        sessionSaver.setUserName(searchUserValue);
        setUserLogin(searchUserValue);
    };

    const handleCancel = () => history.push('/');

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <SearchBar
                    value={searchUserValue}
                    onChange={value => handleSearch(value)}
                    onRequestSearch={() => onSearch(searchUserValue)}
                    cancelOnEscape
                    onCancelSearch={handleCancel}
                />
            </Box>
            {userLogin && <UserDataGR searchValue={userLogin} />}
        </Container>
    );
};
