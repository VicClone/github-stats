import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import { Redirect } from 'react-router-dom';
import { getOauthAuthorizeLink } from '../utils/Oauth';
import { loginUserAction } from '../store/actions';
import { AuthContextType } from '../types/appTypes';
import { authenticate } from '../models/api';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
            <Card>
                <CardActionArea>
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
                            >
                                Войти с помощью GitHub
                            </Button>
                            <CircularProgress size={24} />
                            {data.isLoading && <CircularProgress size={24} />}
                        </div>
                    </CardActions>
                </CardActionArea>
            </Card>
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
        </Container>
    );
};
