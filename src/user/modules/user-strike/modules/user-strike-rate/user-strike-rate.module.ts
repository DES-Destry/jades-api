import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeRateRepository } from './repositories/user-strike-rate.repository';
import { UserStrikeRateService } from './user-strike-rate.service';

@Module({
  imports: [SequelizeModule.forFeature([UserStrikeRateModule])],
  providers: [UserStrikeRateService, UserStrikeRateRepository],
  exports: [UserStrikeRateService],
})
export class UserStrikeRateModule {}
