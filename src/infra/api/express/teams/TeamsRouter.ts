import Router from 'express-promise-router';
import { addTeamHandler } from './TeamsResource';

const TeamsRouter = Router();

TeamsRouter.post('/', addTeamHandler);

export default TeamsRouter;
