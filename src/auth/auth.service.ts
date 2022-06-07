import { Injectable, UnauthorizedException } from '@nestjs/common';

// eslint-disable-next-line
import { UserService } from '../user/user.service';

import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { id } = user;
      return { username, id };
    }
    return null;
  }
  async login({ username, password }): Promise<any> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('The passed credentials are incorrect');
    }

    const accessToken = await this.tokenService.createToken(user);
    return {
      accessToken,
      ...user,
    };
  }
}
