import { Module } from '@nestjs/common';
import { AuthEmailModule } from './modules/email/email.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [AuthEmailModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
