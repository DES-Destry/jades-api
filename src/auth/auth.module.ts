import { Module } from '@nestjs/common';
import { AuthEmailModule } from './modules/email/email.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from './modules/token/token.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthEmailModule, TokenModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
