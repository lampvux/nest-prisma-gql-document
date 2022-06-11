import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findOne: jest.fn(() => {}),
        remove: jest.fn(() => {}),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
