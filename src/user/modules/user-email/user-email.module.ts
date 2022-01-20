import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailRepository } from './repository/user-email.repository';
import { UserEmailModel } from './user-email.model';
import { UserEmailService } from './user-email.service';

@Module({
  imports: [SequelizeModule.forFeature([UserEmailModel])],
  providers: [UserEmailService, UserEmailRepository],
  exports: [UserEmailService],
})
export class UserEmailModule {}
