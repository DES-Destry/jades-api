import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContactEntity } from './contact.entity';
import { UserContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserContactEntity])],
  providers: [UserContactService],
})
export class UserContactModule {}
