import React from 'react';
import { Card, CardHeader, Grid, Box, Avatar, LinearProgress } from '@material-ui/core';
import { GET_USER_DATA } from '../../graphqlApi/getUserData';
import { useQuery } from '@apollo/client';
import { Alert, AlertTitle } from '@material-ui/lab';
import { RenderUserInfo } from '../UserInfo/UserInfo';
import { UserInfoGraphs } from '../UserInfo/UserInfoGraphs';
import { RenderReposInfo } from './ReposInfo';

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
        <Box mt={10}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            avatar={<Avatar alt="name name" src={userData?.avatarUrl}></Avatar>}
                            title={userData?.name}
                            subheader={userData?.location}
                        />
                        <UserInfoGraphs languagesInPercents={languagesInPercents} commitStats={commitFrequency} />
                        <RenderUserInfo userInfo={userInfo} />
                        {userRepos && <RenderReposInfo userRepos={userRepos} />}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
