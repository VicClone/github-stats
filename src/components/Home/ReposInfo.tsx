import React from 'react';
import { RepoInfo } from '../../types/apiTypes';
import { CardContent, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { Star as StarIcon } from '@material-ui/icons';
import { sessionSaver } from '../../utils/SessionSaver';
import { Link } from 'react-router-dom';

interface PropsType {
    userRepos: RepoInfo[];
}

export const RenderReposInfo = (props: PropsType) => {
    const handleRepoLink = (repo: RepoInfo) => {
        sessionSaver.setSelectedRepo(repo);
    };

    return (
        <CardContent>
            <Typography component="span" variant="body1" color="textPrimary" className="repoHeader">
                Репозитории:
            </Typography>
            <List>
                {props.userRepos.map(repo => {
                    return (
                        <ListItem key={repo.id}>
                            <ListItemText
                                primary={repo.name}
                                secondary={
                                    <>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="textPrimary"
                                            className="repoStar"
                                        >
                                            <StarIcon /> {repo.stargazerCount}
                                        </Typography>
                                        {repo.language}
                                    </>
                                }
                            />
                            <Link to={`/repository/${repo.name}`} onClick={() => handleRepoLink(repo)}>
                                Перейти
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </CardContent>
    );
};
