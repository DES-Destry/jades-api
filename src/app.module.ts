import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserEmailModule } from './user-email/user-email.module';

@Module({
  imports: [UserModule, UserEmailModule],
})
export class AppModule {}
