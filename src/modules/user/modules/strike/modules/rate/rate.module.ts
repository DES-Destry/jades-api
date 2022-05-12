import { Module } from '@nestjs/common';
import { UserStrikeRateRepository } from './repositories/rate.repository';
import { UserStrikeRateService } from './rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStrikeRateEntity } from './rate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStrikeRateEntity])],
  providers: [
    UserStrikeRateService,
    {
      provide: 'IUserStrikeRateRepository',
      useClass: UserStrikeRateRepository,
    },
  ],
  exports: [UserStrikeRateService],
})
export class UserStrikeRateModule {}
