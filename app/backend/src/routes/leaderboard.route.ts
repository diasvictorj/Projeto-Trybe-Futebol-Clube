import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardsRouter = Router();

leaderboardsRouter.get('/', async (req: Request, res: Response) => {
  await LeaderboardController.getLeaderboard(req, res);
});

leaderboardsRouter.get('/home', async (req: Request, res: Response) => {
  await LeaderboardController.getLeaderboard(req, res);
});

leaderboardsRouter.get('/away', async (req: Request, res: Response) => {
  await LeaderboardController.getLeaderboard(req, res);
});

export default leaderboardsRouter;
