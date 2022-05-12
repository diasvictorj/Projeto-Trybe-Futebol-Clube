import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardsRouter = Router();

leaderboardsRouter.get('/home', async (req: Request, res: Response) => {
  await LeaderboardController.getLeaderboard(req, res);
});

export default leaderboardsRouter;
