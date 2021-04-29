import React from 'react';
import { Grid, Box, Container, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { RepoDataGraphQl, RepoDataGrVars } from '../../types/apiTypes';
import { getAverageClosingTimeData } from '../../utils/averageClosingTimeStats';
import { AverageClosingTimeData } from '../../types/appTypes';
import { GET_REPO_DATA } from '../../graphqlApi/getRepoData';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { RepoDataComponent } from './RepoDataComponent';

export const Repository: React.FC = () => {
    const { owner, name } = useParams<{ owner: string; name: string }>();
    const userName = owner;
    const repoName = name;

    const { loading, error, data } = useQuery<RepoDataGraphQl, RepoDataGrVars>(GET_REPO_DATA, {
        variables: { owner: userName, repoName: repoName }
    });

    if (!(userName && repoName)) {
        return null;
    }

    if (loading) {
        return (
            <div>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>{error.message}</AlertTitle>
            </Alert>
        );
    }

    if (!data) {
        return (
            <Alert severity="error">
                <AlertTitle>No data</AlertTitle>
            </Alert>
        );
    }

    const repoData = data.repository;
    const pullRequests = repoData.pullRequests.nodes;
    const issues = repoData.issues.nodes;
    const pullRequestsStats: AverageClosingTimeData = getAverageClosingTimeData(pullRequests);
    const issuesStats: AverageClosingTimeData = getAverageClosingTimeData(issues);

    return (
        <Container maxWidth="md">
            <Box mt={20}>
                <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                        {repoData && (
                            <RepoDataComponent
                                repoData={repoData}
                                pullRequestsStats={pullRequestsStats}
                                issuesStats={issuesStats}
                            />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};
