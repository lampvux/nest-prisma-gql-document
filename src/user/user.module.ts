import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [AuthModule, PrismaModule, UserService],
})
export class UserModule {}
