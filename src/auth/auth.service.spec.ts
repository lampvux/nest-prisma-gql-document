import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const authServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => {}),
      }),
    };
    const userServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findOne: jest.fn(() => {}),
        remove: jest.fn(() => {}),
      }),
    };
    const passwordServiceProvider = {
      provide: PasswordService,
      useFactory: () => ({
        compare: jest.fn(() => {}),
        hash: jest.fn(() => {}),
      }),
    };
    const tokenServiceProvider = {
      provide: TokenService,
      useFactory: () => ({
        createToken: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        authServiceProvider,
        userServiceProvider,
        passwordServiceProvider,
        tokenServiceProvider,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
