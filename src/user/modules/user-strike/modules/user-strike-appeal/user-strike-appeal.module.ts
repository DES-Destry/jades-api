import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeAppealRepository } from './repositories/user-strike-appeal.repository';
import { UserStrikeAppealModel } from './user-strike-appeal.model';
import { UserStrikeAppealService } from './user-strike-appeal.service';

@Module({
  imports: [SequelizeModule.forFeature([UserStrikeAppealModel])],
  providers: [UserStrikeAppealService, UserStrikeAppealRepository],
  exports: [UserStrikeAppealService],
})
export class UserStrikeAppealModule {}
