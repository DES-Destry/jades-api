import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailRepository } from './repository/email.repository';
import { UserEmailModel } from './email.model';
import { UserEmailService } from './email.service';
import { UserEmailIdentityModule } from './modules/identity/identity.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserEmailModel]),
    forwardRef(() => UserEmailIdentityModule),
  ],
  providers: [UserEmailService, UserEmailRepository],
  exports: [UserEmailService],
})
export class UserEmailModule {}
