import express from 'express';
import bodyParser from 'body-parser';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { config } from './config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'text/*' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.header('Access-Control-Allow-Origin', config.base_url);
    next();
});

app.post('/authenticate', (req, res) => {
    const { code } = req.body;

    const data = new FormData();
    data.append('client_id', config.client_id);
    data.append('client_secret', config.client_secret);
    data.append('code', code);
    data.append('redirect_uri', config.redirect_uri);

    fetch(`https://github.com/login/oauth/access_token`, {
        method: 'POST',
        body: data
    })
        .then((response: fetch.Response) => response.text())
        .then((paramsString: string) => {
            const params = new URLSearchParams(paramsString);

            return params.get('access_token');
        })
        .then((response: unknown) => {
            return res.status(200).json(response);
        })
        .catch((error: { message: string }) => {
            return res.status(400).json(error);
        });
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
