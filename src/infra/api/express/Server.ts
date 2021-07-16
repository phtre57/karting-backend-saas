import { createServer } from 'http';
import express, { Request, Response } from 'express';
import process from 'process';
import bodyParser from 'body-parser';
import cors from 'cors';

import TeamsRouter from './teams/TeamsRouter';

const app = express();
const server = createServer(app);

const port = 8080;

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use(bodyParser.json());
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: Error, req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.use('/teams', TeamsRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});

export default server;
