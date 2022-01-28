import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeRateRepository } from './repositories/user-strike-rate.repository';
import { UserStrikeRateModel } from './user-strike-rate.model';
import { UserStrikeRateService } from './user-strike-rate.service';

@Module({
  imports: [SequelizeModule.forFeature([UserStrikeRateModel])],
  providers: [UserStrikeRateService, UserStrikeRateRepository],
  exports: [UserStrikeRateService],
})
export class UserStrikeRateModule {}
