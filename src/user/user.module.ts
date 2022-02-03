import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailModule } from 'src/user/modules/email/email.module';
import { UserIdentityModule } from './modules/identity/identity.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserRoleModule } from './modules/role/role.module';
import { UserContactModule } from './modules/contact/contact.module';
import { UserStrikeModule } from './modules/strike/strike.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    forwardRef(() => UserIdentityModule),
    UserEmailModule,
    UserContactModule,
    UserRoleModule,
    UserStrikeModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
