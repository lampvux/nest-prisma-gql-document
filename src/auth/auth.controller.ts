import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCredential } from './login-credential';
import { SignInfo } from './sign-info';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() body: LoginCredential): Promise<SignInfo> {
    return this.authService.login(body);
  }
}
