import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DbConfig } from './shared/config/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [SequelizeModule.forRoot(DbConfig.Options), UserModule],
})
export class AppModule {}
