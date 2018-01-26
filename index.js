import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, host, () => {
  console.log(`Ad Meliora API server is listening on http://${host}:${port}/`);
});
