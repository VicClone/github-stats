import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../../App';
import { AuthContextType } from '../../types/appTypes';
import { Container, Box, Grid, Button } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import './Home.css';
import { sessionSaver } from '../../utils/SessionSaver';
import { UserData as UserDataGR } from './UserData';

export const Home: React.FC = () => {
    const {
        state: { isLoggedIn }
    } = useContext<AuthContextType>(AuthContext);

    const [searchUserValue, setSearchUserValue] = useState<string>('');
    const [searchUserValue2, setSearchUserValue2] = useState<string>('');
    const [userLogin, setUserLogin] = useState<string>('');
    const [userLogin2, setUserLogin2] = useState<string>('');
    const { searched } = useParams<{ searched: string }>();
    const [toggleSecondUser, setToggleSecondUser] = useState<boolean>(false);

    const history = useHistory();

    useEffect(() => {
        const delimiterPosition = searched ? searched.indexOf('&') : -1;

        if (delimiterPosition !== -1) {
            const userName1 = searched.slice(0, delimiterPosition);
            const userName2 = searched.slice(delimiterPosition + 1);

            setSearchUserValue(userName1);
            searchUser(userName1, setUserLogin);
            setSearchUserValue2(userName2);
            searchUser(userName2, setUserLogin2);
            setToggleSecondUser(true);
        } else {
            setSearchUserValue(searched);
            searchUser(searched, setUserLogin);
        }
    }, [searched]);

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    const handleSearch = (searchValue: string, setState: any) => {
        setState('');
        setState(searchValue);
    };

    const onSearch = (userName: string, isSecondUser = false) => {
        history.push(userName);

        if (searchUserValue2) {
            history.push(`${userName}&${searchUserValue2}`);
        }

        if (isSecondUser) {
            history.push(`${searchUserValue}&${userName}`);
        }
    };

    const searchUser = (searchUserValue: string, setLogin: any) => {
        sessionSaver.setUserName(searchUserValue);
        setLogin(searchUserValue);
    };

    const deleteSecondUser = () => {
        setToggleSecondUser(false);
        history.push(searchUserValue);
    };

    const handleCancel = () => history.push('/');

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={toggleSecondUser ? 6 : 12}>
                    <Box mt={20}>
                        <SearchBar
                            value={searchUserValue}
                            onChange={value => handleSearch(value, setSearchUserValue)}
                            onRequestSearch={() => onSearch(searchUserValue)}
                            cancelOnEscape
                            onCancelSearch={handleCancel}
                        />
                    </Box>
                    {!toggleSecondUser && searched && (
                        <Box display="flex" justifyContent="center" my={3}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setToggleSecondUser(true);
                                }}
                            >
                                Добавить пользователя
                            </Button>
                        </Box>
                    )}
                    {userLogin && <UserDataGR searchValue={userLogin} />}
                </Grid>
                {toggleSecondUser && (
                    <Grid item xs={6}>
                        <Box mt={20}>
                            <SearchBar
                                value={searchUserValue2}
                                onChange={value => handleSearch(value, setSearchUserValue2)}
                                onRequestSearch={() => onSearch(searchUserValue2, true)}
                                cancelOnEscape
                                onCancelSearch={handleCancel}
                            />
                        </Box>
                        {toggleSecondUser && (
                            <Box display="flex" justifyContent="center" my={3}>
                                <Button variant="contained" color="secondary" onClick={() => deleteSecondUser()}>
                                    Убрать пользователя
                                </Button>
                            </Box>
                        )}
                        {userLogin2 && <UserDataGR searchValue={userLogin2} />}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};
