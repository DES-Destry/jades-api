import { Test, TestingModule } from '@nestjs/testing';
import { UserRolePrivilegeService } from './privilege.service';

describe('UserRolePrivilegeService', () => {
  let service: UserRolePrivilegeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRolePrivilegeService],
    }).compile();

    service = module.get<UserRolePrivilegeService>(UserRolePrivilegeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
