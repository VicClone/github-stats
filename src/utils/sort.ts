function sortRepos(a: any, b: any) {
    const stargazersCountA = a.stargazersCount;
    const stargazersCountB = b.stargazersCount;

    if (stargazersCountA === stargazersCountB) {
        const datePushedA = new Date(a.pushed_at).getTime();
        const datePushedB = new Date(b.pushed_at).getTime();

        return datePushedB - datePushedA;
    }

    return stargazersCountB - stargazersCountA;
}

export { sortRepos };
