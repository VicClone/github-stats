import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Box,
    Avatar,
    LinearProgress,
    Typography,
    Button
} from '@material-ui/core';
import { GET_USER_DATA } from '../../graphqlApi/getUserData';
import { useQuery } from '@apollo/client';
import { Alert, AlertTitle } from '@material-ui/lab';
import { RenderUserInfo } from '../UserInfo/UserInfo';
import { UserInfoGraphs } from '../UserInfo/UserInfoGraphs';
import { RenderReposInfo } from '../Repositories/ReposInfo';
import { Collaborators } from '../UserInfo/Collaborators';
import { UserDataGraphQl, UserDataGrVars, UserInfo as UserInfoType, RepoInfo } from '../../types/apiTypes';
import { LanguagePercents } from '../../types/appTypes';
import { parseUserInfo, parseRepos, getStatsLanguagesTop, getCommitFrequency } from '../../utils/parse';

interface PropsType {
    searchValue: string;
}

export const UserData = (props: PropsType) => {
    const { loading, error, data } = useQuery<UserDataGraphQl, UserDataGrVars>(GET_USER_DATA, {
        variables: { login: props.searchValue }
    });

    const [toggleCollaborators, setToggleCollaborators] = useState<boolean>(false);

    if (loading) {
        return (
            <div>
                <LinearProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Box mt={10}>
                <Alert severity="error">
                    <AlertTitle>{error.networkError ? 'Что пошло не так...' : 'Пользователь не найден'}</AlertTitle>
                </Alert>
            </Box>
        );
    }

    if (!data) {
        return <div>No data</div>;
    }

    const userData = data.user;

    const userInfo: UserInfoType = parseUserInfo(userData);
    const userRepos: RepoInfo[] = parseRepos(userData);
    const languagesInPercents: LanguagePercents[] = getStatsLanguagesTop(userRepos, 10);
    const commitFrequency = getCommitFrequency(userRepos);

    return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardHeader
                        avatar={<Avatar alt="name name" src={userData?.avatarUrl} />}
                        title={userData?.name}
                        subheader={userData?.location}
                    />
                    <CardContent>
                        <Typography>Топ 10 часто встречающихся пользователей в репозиториях</Typography>
                        <Box mt={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setToggleCollaborators(!toggleCollaborators)}
                            >
                                {toggleCollaborators ? 'Скрыть' : 'Показать'}
                            </Button>
                        </Box>
                        {toggleCollaborators && <Collaborators login={userData?.login} />}
                    </CardContent>
                    <UserInfoGraphs languagesInPercents={languagesInPercents} commitStats={commitFrequency} />
                    <RenderUserInfo userInfo={userInfo} />
                    {userRepos && <RenderReposInfo userRepos={userRepos} />}
                </Card>
            </Grid>
        </Grid>
    );
};
