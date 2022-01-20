import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailModule } from 'src/user/modules/user-email/user-email.module';
import { UserEmailModel } from './modules/user-email/user-email.model';
import { UserIdentityModel } from './modules/user-identity/user-identity.model';
import { UserIdentityModule } from './modules/user-identity/user-identity.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    UserEmailModule,
    forwardRef(() => UserIdentityModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
