import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeRepository } from './repositories/user-strike.repository';
import { UserStrikeModel } from './user-strike.model';
import { UserStrikeService } from './user-strike.service';
import { UserStrikeAppealModule } from './modules/user-strike-appeal/user-strike-appeal.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserStrikeModel]),
    UserStrikeAppealModule,
  ],
  providers: [UserStrikeService, UserStrikeRepository],
  exports: [UserStrikeService],
})
export class UserStrikeModule {}
