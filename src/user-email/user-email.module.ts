import { Module } from '@nestjs/common';
import { UserEmailService } from './user-email.service';

@Module({
  providers: [UserEmailService],
})
export class UserEmailModule {}
