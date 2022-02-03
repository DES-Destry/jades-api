import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailSender } from 'src/shared/senders/email.sender';
import { UserModule } from 'src/user/user.module';
import { UserIdentityRepository } from './repositories/identity.repository';
import { UserIdentityModel } from './identity.model';
import { UserIdentityService } from './identity.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserIdentityModel]),
    forwardRef(() => UserModule),
  ],
  providers: [UserIdentityService, UserIdentityRepository, EmailSender],
  exports: [UserIdentityService],
})
export class UserIdentityModule {}
