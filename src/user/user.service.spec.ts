import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let findOne: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    const userServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        create: jest.fn(() => {}),
        findOne,
        remove: jest.fn(() => {}),
        update: jest.fn(() => {}),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userServiceProvider],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('create user unit test', () => {
  //   it('should create an user record and return that', async () => {
  //     expect(
  //       await service
  //         .create({
  //           data: {
  //             email: 'lam.vu@xample.com',
  //             username: 'lamvu',
  //             password: '123456',
  //             name: 'vu lam',
  //           },
  //         })
  //         .then((returnedUser) => {}),
  //     );
  //   });
  // });

  describe('find user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });
      it('should return the user', async () => {
        const fetchedUser = await service.findOne({
          where: { email: 'markwan@gmail.com' },
        });
        expect(fetchedUser).toEqual(user);
      });
    });
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });
      it('should throw an error', async () => {
        await expect(
          service.findOne({ where: { email: 'markwa123n@gmail.com' } }),
        ).rejects;
      });
    });
  });
});
