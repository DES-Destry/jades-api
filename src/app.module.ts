import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DbConfig } from './shared/config/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(DbConfig.Options), UserModule, AuthModule],
})
export class AppModule {}
