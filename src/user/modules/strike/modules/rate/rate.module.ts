import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeRateRepository } from './repositories/rate.repository';
import { UserStrikeRateModel } from './rate.model';
import { UserStrikeRateService } from './rate.service';

@Module({
  imports: [SequelizeModule.forFeature([UserStrikeRateModel])],
  providers: [UserStrikeRateService, UserStrikeRateRepository],
  exports: [UserStrikeRateService],
})
export class UserStrikeRateModule {}
