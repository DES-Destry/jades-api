import { Module } from '@nestjs/common';
import { UserStrikeAppealRepository } from './repositories/appeal.repository';
import { UserStrikeAppealService } from './appeal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStrikeAppealEntity } from './appeal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStrikeAppealEntity])],
  providers: [
    UserStrikeAppealService,
    {
      provide: 'IUserStrikeAppealRepository',
      useClass: UserStrikeAppealRepository,
    },
  ],
  exports: [UserStrikeAppealService],
})
export class UserStrikeAppealModule {}
