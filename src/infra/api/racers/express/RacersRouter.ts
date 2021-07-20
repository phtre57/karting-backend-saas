import Router from 'express-promise-router';
import { getRacerHandler } from './RacersResource';

const RacersRouter = Router();

RacersRouter.get('/:id', getRacerHandler);

export default RacersRouter;
