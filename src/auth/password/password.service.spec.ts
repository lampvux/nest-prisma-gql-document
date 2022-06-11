import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(async () => {
    const passwordServiceProvider = {
      provide: PasswordService,
      useFactory: () => ({
        compare: jest.fn(() => {}),
        hash: jest.fn(() => {}),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService, passwordServiceProvider],
    }).compile();

    service = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
