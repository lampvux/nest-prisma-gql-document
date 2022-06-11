import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const tokenServiceProvider = {
      provide: TokenService,
      useFactory: () => ({
        createToken: jest.fn(() => {}),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenService, tokenServiceProvider],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
