import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCredential } from './login-credential';
import { SignUserInfo } from './sign-user-info';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginCredential): Promise<SignUserInfo> {
    return this.authService.login(body);
  }
}
