import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, PasswordService, TokenService],
  controllers: [AuthController],
  exports: [AuthService, PasswordService],
})
export class AuthModule {}
