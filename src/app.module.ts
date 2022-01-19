import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserEmailModule } from './user-email/user-email.module';
import { UserIdentityModule } from './user-identity/user-identity.module';

@Module({
  imports: [UserModule, UserEmailModule, UserIdentityModule],
})
export class AppModule {}
