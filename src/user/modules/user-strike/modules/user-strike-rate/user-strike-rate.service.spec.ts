import { Test, TestingModule } from '@nestjs/testing';
import { UserStrikeRateService } from './user-strike-rate.service';

describe('UserStrikeRateService', () => {
  let service: UserStrikeRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStrikeRateService],
    }).compile();

    service = module.get<UserStrikeRateService>(UserStrikeRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
