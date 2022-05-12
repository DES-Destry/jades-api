import { forwardRef, Module } from '@nestjs/common';
import { EmailSender } from 'src/shared/senders/email.sender';
import { UserEmailIdentityRepository } from './repositories/identity.repository';
import { UserEmailIdentityService } from './identity.service';
import { UserEmailModule } from '../../email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEmailIdentityEntity } from './identity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEmailIdentityEntity]),
    forwardRef(() => UserEmailModule),
  ],
  providers: [
    UserEmailIdentityService,
    {
      provide: 'IUserEmailIdentityRepository',
      useClass: UserEmailIdentityRepository,
    },
    EmailSender,
  ],
  exports: [UserEmailIdentityService],
})
export class UserEmailIdentityModule {}
