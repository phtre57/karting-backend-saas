import Router from 'express-promise-router';

const TeamsRouter = Router();

TeamsRouter.post('', getFundYearlyCumulativeGrowthHandler);

export default TeamsRouter;
