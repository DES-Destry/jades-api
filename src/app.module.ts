import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { DbConfig } from './shared/config/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [SequelizeModule.forRoot(DbConfig.Options), UserModule, AuthModule],
})
export class AppModule {}
