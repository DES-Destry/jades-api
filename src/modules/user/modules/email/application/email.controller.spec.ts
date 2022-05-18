import { Test, TestingModule } from '@nestjs/testing';
import { UserEmailController } from './email.controller';

describe('UserEmailController', () => {
  let controller: UserEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEmailController],
    }).compile();

    controller = module.get<UserEmailController>(UserEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
