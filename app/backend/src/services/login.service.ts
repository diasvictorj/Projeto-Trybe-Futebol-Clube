import Users from '../database/models/user.model';
import User from '../interfaces/user.interface';
import JwtToken from '../utils/jwt';

export default class LoginService {
  public static async findUserByEmail(email: string): Promise<User> {
    const user = await Users.findOne({
      where: { email },
    });
    return user as User;
  }

  public static async login(email: string) {
    const user = await this.findUserByEmail(email);
    const token = JwtToken.sign({
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    });
    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token };
  }

  public static async getRole(authorization: string): Promise<User> {
    const token = authorization;
    const user = JwtToken.verify(token);
    return user as User;
  }
}
