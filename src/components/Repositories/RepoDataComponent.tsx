import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { AccountTree, CallSplit, Description, Face, Grade, Update } from '@material-ui/icons';
import { RepositoryGraphs } from './RepositoryGraphs/RepositoryGraphs';
import React, { useState } from 'react';
import { AverageClosingTimeData } from '../../types/appTypes';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { RepoData } from '../../types/apiTypes';
import { parseDatetime } from '../../utils/parse';

interface RepoDataProps {
    repoData: RepoData;
    pullRequestsStats: AverageClosingTimeData;
    issuesStats: AverageClosingTimeData;
}

const useStyles = makeStyles(() =>
    createStyles({
        actions: {
            marginTop: '15px'
        }
    })
);

export const RepoDataComponent = ({ repoData, pullRequestsStats, issuesStats }: RepoDataProps) => {
    const classes = useStyles();
    const { owner, name, isFork, forkCount, stargazerCount, updatedAt, sshUrl, description } = repoData;
    const [isToggleCopied, setToggleCopied] = useState(false);

    const handleCloneBtn = (sshUrl: string) => {
        setToggleCopied(true);
        navigator.clipboard.writeText(sshUrl);
        setTimeout(() => {
            setToggleCopied(false);
        }, 2000);
    };

    const history = useHistory();
    const goBack = () => history.goBack();

    const renderListItem = (text: React.ReactNode, icon: React.ReactNode) => {
        return (
            <ListItem>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{text}</ListItemText>
            </ListItem>
        );
    };

    const getIsForkText = (isFork: boolean) => (isFork ? 'Форк' : 'Не форк');
    const getLastUpdateText = (updatedAt: string) => `Последнее обновление: ${parseDatetime(updatedAt)}`;
    const getCountForkText = (forkCount: number) => `Количество форков: ${forkCount}`;
    const getStargazerCountText = (stargazerCount: number) => `Рейтинг репозитория: ${stargazerCount}`;

    const getOwnerLink = (owner: { login: string; avatarUrl: string }): React.ReactNode => {
        const link = `https://github.com/${owner.login}`;
        return (
            <Link href={link} target="_blank">
                {owner.login}
            </Link>
        );
    };

    return (
        <Card>
            <CardHeader
                avatar={owner && <Avatar alt={owner.login} src={owner.avatarUrl} />}
                title={name}
                action={
                    <Button variant="contained" color="primary" onClick={handleCloneBtn.bind(null, sshUrl)}>
                        Склонировать
                    </Button>
                }
            />
            {isToggleCopied && <Alert severity="success">Ссылка скопирована</Alert>}
            <CardContent>
                <List>
                    {owner && renderListItem(getOwnerLink(owner), <Face />)}
                    {description && renderListItem(description, <Description />)}
                    {renderListItem(getStargazerCountText(stargazerCount), <Grade />)}
                    {renderListItem(getCountForkText(forkCount), <CallSplit />)}
                    {renderListItem(getIsForkText(isFork), <AccountTree />)}
                    {renderListItem(getLastUpdateText(updatedAt), <Update />)}
                </List>
                <RepositoryGraphs pullRequestsStats={pullRequestsStats} issuesStats={issuesStats} />
                <CardActions className={classes.actions}>
                    <Button variant="contained" color="primary" onClick={() => goBack()}>
                        Назад
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};
