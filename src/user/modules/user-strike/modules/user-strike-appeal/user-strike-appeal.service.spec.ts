import { Test, TestingModule } from '@nestjs/testing';
import { UserStrikeAppealService } from './user-strike-appeal.service';

describe('UserStrikeAppealService', () => {
  let service: UserStrikeAppealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStrikeAppealService],
    }).compile();

    service = module.get<UserStrikeAppealService>(UserStrikeAppealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
