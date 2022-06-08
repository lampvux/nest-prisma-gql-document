import { SetMetadata } from '@nestjs/common';

export const SignUser = (...args: string[]) => SetMetadata('sign-user', args);
