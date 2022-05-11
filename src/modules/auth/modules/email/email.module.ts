import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from 'src/shared/config/app.config';
import { UserModule } from 'src/modules/user/user.module';
import { AuthTokenModule } from '../token/token.module';
import { AuthEmailController } from './email.controller';
import { AuthEmailService } from './email.service';

@Module({
  imports: [
    JwtModule.register(AppConfig.JwtDefaultOptions),
    UserModule,
    AuthTokenModule,
  ],
  controllers: [AuthEmailController],
  providers: [AuthEmailService],
})
export class AuthEmailModule {}
