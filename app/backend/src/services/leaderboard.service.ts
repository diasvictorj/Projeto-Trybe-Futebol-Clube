import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import ILeaderboard from '../interfaces/leaderboard.interface';

export default class LeaderboardService {
  public static GoalsInfo = (data: Matches[]) => {
    let goalsFavor = 0;
    let goalsOwn = 0;

    data.forEach((match) => {
      goalsFavor += match.homeTeamGoals;
      goalsOwn += match.awayTeamGoals;
    });

    const response = { goalsFavor, goalsOwn };

    return response;
  };

  public static MatchInfo = (data: Matches[]) => {
    let totalPoints = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;

    data.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalPoints += 3;
        totalVictories += 1;
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        totalPoints += 1;
        totalDraws += 1;
      } else {
        totalLosses += 1;
      }
    });

    const response = { totalPoints, totalVictories, totalDraws, totalLosses };

    return response;
  };

  public static async matchData(id: number, name: string) {
    const matches = await Matches.findAll({ where: { homeTeam: id, inProgress: false } });
    const goals = LeaderboardService.GoalsInfo(matches);
    const matchInfo = LeaderboardService.MatchInfo(matches);
    const totalGames = matches.length;
    const efficiency = Number(((matchInfo.totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const response = {
      name,
      ...matchInfo,
      ...goals,
      goalsBalance: goals.goalsFavor - goals.goalsOwn,
      efficiency,
      totalGames,
    };

    return response;
  }

  public static sortLeaderboard = (leaderboard: ILeaderboard[]) => {
    leaderboard.sort((team1, team2) => team2.goalsOwn - team1.goalsOwn);
    leaderboard.sort((team1, team2) => team2.goalsFavor - team1.goalsFavor);
    leaderboard.sort((team1, team2) => team2.goalsBalance - team1.goalsBalance);
    leaderboard.sort((team1, team2) => team2.totalPoints - team1.totalPoints);

    return leaderboard;
  };

  public static async getAllLeaderboard() {
    const teams = await Teams.findAll();
    if (!teams) throw new Error('Something went wrong!!');
    const teamsInfo = await Promise.all(
      teams.map((t) => LeaderboardService.matchData(t.id, t.teamName)),
    );

    const sortedTeams = LeaderboardService.sortLeaderboard(teamsInfo);

    return sortedTeams;
  }
}
