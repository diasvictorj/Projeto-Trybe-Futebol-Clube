import * as express from 'express';
import LoginMiddleware from '../middlewares/login.middleware';
import LoginController from 'src/database/controllers/login.controller';

const loginRouter = express.Router();

loginRouter.post(
  '/',
  LoginMiddleware.emailValidation,
  LoginMiddleware.passwordValidation,
  LoginController.login,
);
loginRouter.get('/', LoginController.getRole);

export default loginRouter;
