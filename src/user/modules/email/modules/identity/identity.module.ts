import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmailSender } from 'src/shared/senders/email.sender';
import { UserEmailIdentityRepository } from './repositories/identity.repository';
import { UserEmailIdentityModel } from './identity.model';
import { UserEmailIdentityService } from './identity.service';
import { UserEmailModule } from '../../email.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserEmailIdentityModel]),
    forwardRef(() => UserEmailModule),
  ],
  providers: [
    UserEmailIdentityService,
    UserEmailIdentityRepository,
    EmailSender,
  ],
  exports: [UserEmailIdentityService],
})
export class UserEmailIdentityModule {}
