import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailSender } from 'src/shared/senders/email.sender';
import { UserModule } from 'src/user/user.module';
import { UserIdentityRepository } from './repositories/user-identity.repository';
import { UserIdentityModel } from './user-identity.model';
import { UserIdentityService } from './user-identity.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserIdentityModel]),
    forwardRef(() => UserModule),
  ],
  providers: [UserIdentityService, UserIdentityRepository, EmailSender],
  exports: [UserIdentityService],
})
export class UserIdentityModule {}
