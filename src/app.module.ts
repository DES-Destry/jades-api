import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailModel } from './user/modules/user-email/user-email.model';
import { UserIdentityModel } from './user/modules/user-identity/user-identity.model';
import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      models: [UserModel, UserIdentityModel, UserEmailModel],
    }),
    UserModule,
  ],
})
export class AppModule {}
