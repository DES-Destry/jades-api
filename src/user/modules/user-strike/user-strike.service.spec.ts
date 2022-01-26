import { Test, TestingModule } from '@nestjs/testing';
import { UserStrikeService } from './user-strike.service';

describe('UserStrikeService', () => {
  let service: UserStrikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStrikeService],
    }).compile();

    service = module.get<UserStrikeService>(UserStrikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
