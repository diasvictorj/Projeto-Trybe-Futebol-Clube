import * as express from 'express';
import * as cors from 'cors';
import loginRouter from './routes/login.route';
import teamsRouter from './routes/teams.route';
import matchesRouter from './routes/matches.route';
import leaderboardsRouter from './routes/leaderboard.route';
import errorMiddle from './middlewares/error.middleware';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.app.use(express.json());
    this.config();
    this.app.use('/login', loginRouter);
    this.app.use('/login/validate', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/teams/:id', teamsRouter);
    this.app.use('/matches', matchesRouter);
    this.app.use('/leaderboard', leaderboardsRouter);
    this.app.use(errorMiddle);
    // ...
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    // ...
  }

  // ...
  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log('Ouvindo na porta', PORT));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
