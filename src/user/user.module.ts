import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailModule } from 'src/user/modules/user-email/user-email.module';
import { UserIdentityModule } from './modules/user-identity/user-identity.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { RoleModule } from './modules/role/role.module';
import { RolePrivilegeModule } from './modules/role-privilege/role-privilege.module';
import { UserContactModule } from './modules/user-contact/user-contact.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    forwardRef(() => UserIdentityModule),
    UserEmailModule,
    UserContactModule,
    RoleModule,
    RolePrivilegeModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
