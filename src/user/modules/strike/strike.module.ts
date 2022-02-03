import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserStrikeRepository } from './repositories/strike.repository';
import { UserStrikeModel } from './strike.model';
import { UserStrikeService } from './strike.service';
import { UserStrikeAppealModule } from './modules/appeal/appeal.module';
import { UserStrikeRateModule } from './modules/rate/rate.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserStrikeModel]),
    UserStrikeAppealModule,
    UserStrikeRateModule,
  ],
  providers: [UserStrikeService, UserStrikeRepository],
  exports: [UserStrikeService],
})
export class UserStrikeModule {}
