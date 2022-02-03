import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailRepository } from './repository/email.repository';
import { UserEmailModel } from './email.model';
import { UserEmailService } from './email.service';

@Module({
  imports: [SequelizeModule.forFeature([UserEmailModel])],
  providers: [UserEmailService, UserEmailRepository],
  exports: [UserEmailService],
})
export class UserEmailModule {}
