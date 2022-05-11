import { Test, TestingModule } from '@nestjs/testing';
import { UserEmailIdentityService } from './identity.service';

describe('UserEmailIdentityService', () => {
  let service: UserEmailIdentityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEmailIdentityService],
    }).compile();

    service = module.get<UserEmailIdentityService>(UserEmailIdentityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
