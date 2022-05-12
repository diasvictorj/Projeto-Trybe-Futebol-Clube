import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public static async getLeaderboard(_req: Request, res: Response) {
    const data = await LeaderboardService.getAllLeaderboard();
    return res.status(200).json(data);
  }
}
