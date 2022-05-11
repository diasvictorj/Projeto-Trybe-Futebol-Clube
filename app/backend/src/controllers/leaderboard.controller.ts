/* import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  public static async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const [code, result] = await this.leaderboardService.getLeaderboard();
    return res.status(code).json(result);
  }

  public static async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    const [code, result] = await this.leaderboardService.getLeaderboardHome();
    return res.status(code).json(result);
  }

  public static async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    const [code, result] = await this.leaderboardService.getLeaderboardAway();
    return res.status(code).json(result);
  }
}
 */
