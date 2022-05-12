import { forwardRef, Module } from '@nestjs/common';
import { UserEmailRepository } from './repository/email.repository';
import { UserEmailService } from './email.service';
import { UserEmailIdentityModule } from './modules/identity/identity.module';
import { UserEmailController } from './email.controller';
import { UserModule } from 'src/modules/user/user.module';
import { UserEmailEntity } from './email.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEmailEntity]),
    forwardRef(() => UserEmailIdentityModule),
    forwardRef(() => UserModule),
  ],
  providers: [
    UserEmailService,
    {
      provide: 'IUserEmailRepository',
      useClass: UserEmailRepository,
    },
  ],
  exports: [UserEmailService],
  controllers: [UserEmailController],
})
export class UserEmailModule {}
