import { Module } from '@nestjs/common';
import { UserStrikeRepository } from './repositories/strike.repository';
import { UserStrikeService } from './strike.service';
import { UserStrikeAppealModule } from './modules/appeal/appeal.module';
import { UserStrikeRateModule } from './modules/rate/rate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStrikeEntity } from './strike.entity';
import { UserStrikeAppealEntity } from './modules/appeal/appeal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStrikeEntity, UserStrikeAppealEntity]),
    UserStrikeAppealModule,
    UserStrikeRateModule,
  ],
  providers: [UserStrikeService, UserStrikeRepository],
  exports: [UserStrikeService],
})
export class UserStrikeModule {}
