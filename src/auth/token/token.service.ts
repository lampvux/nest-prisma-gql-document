import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(protected readonly jwtService: JwtService) {}
  /**
   *
   * @param username
   * @param password
   * @returns a jwt token sign with the username
   */
  createToken({ username, id }): Promise<string> {
    if (!username) return Promise.reject('INVALID_USERNAME_ERROR');
    if (!id) return Promise.reject('INVALID_ID_ERROR');
    return this.jwtService.signAsync({ username, id });
  }
}
