import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailRepository } from './repository/email.repository';
import { UserEmailModel } from './email.model';
import { UserEmailService } from './email.service';
import { UserEmailIdentityModule } from './modules/identity/identity.module';
import { UserEmailController } from './email.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserEmailModel]),
    forwardRef(() => UserEmailIdentityModule),
    forwardRef(() => UserModule),
  ],
  providers: [UserEmailService, UserEmailRepository],
  exports: [UserEmailService],
  controllers: [UserEmailController],
})
export class UserEmailModule {}
