import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeAppealRepository } from './repositories/appeal.repository';
import { UserStrikeAppealModel } from './appeal.model';
import { UserStrikeAppealService } from './appeal.service';

@Module({
  imports: [SequelizeModule.forFeature([UserStrikeAppealModel])],
  providers: [UserStrikeAppealService, UserStrikeAppealRepository],
  exports: [UserStrikeAppealService],
})
export class UserStrikeAppealModule {}
