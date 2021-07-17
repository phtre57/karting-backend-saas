import Router from 'express-promise-router';
import { addTeamHandler, getTeamHandler } from './TeamsResource';

const TeamsRouter = Router();

TeamsRouter.get('/:id', getTeamHandler);
TeamsRouter.post('/', addTeamHandler);

export default TeamsRouter;
