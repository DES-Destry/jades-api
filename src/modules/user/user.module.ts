import { Module } from '@nestjs/common';
import { UserEmailModule } from 'src/modules/user/modules/email/email.module';
import { UserEmailIdentityModule } from './modules/email/modules/identity/identity.module';
import { UserRepository } from './infrastructure/user.repository';
import { UserController } from './application/user.controller';
import { UserService } from './user.service';
import { UserRoleModule } from './modules/role/role.module';
import { UserContactModule } from './modules/contact/contact.module';
import { UserStrikeModule } from './modules/strike/strike.module';
import { UserSubscriptionModule } from './modules/subscription/subscription.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserEmailIdentityModule,
    UserSubscriptionModule,
    UserEmailModule,
    UserContactModule,
    UserRoleModule,
    UserStrikeModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
