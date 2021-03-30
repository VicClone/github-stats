import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import { Redirect } from 'react-router-dom';
import { getOauthAuthorizeLink } from '../utils/Oauth';
import { loginUserAction } from '../store/actions';
import { AuthContextType } from '../types/appTypes';
import { authenticate } from '../models/api';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonProgress: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        }
    })
);

export const Login: React.FC = () => {
    const classes = useStyles();

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
        <Container maxWidth="sm">
            <Box mt={20}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            Добро пожаловать
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Здесь можно посмотреть статистику гитхаба интересующего вас пользователя
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                href={getOauthAuthorizeLink(clientId, redirectUri)}
                                disabled={data.isLoading}
                                className="buttonClassname"
                                onClick={() => {
                                    setData({ ...data, errorMessage: '' });
                                }}
                            >
                                Войти с помощью GitHub
                            </Button>
                            {data.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};
