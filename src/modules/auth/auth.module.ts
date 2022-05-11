import { Module } from '@nestjs/common';
import { AuthEmailModule } from './modules/email/email.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthTokenModule } from './modules/token/token.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [AuthEmailModule, AuthTokenModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
