import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserContactModel } from './user-contact.model';
import { UserContactService } from './user-contact.service';

@Module({
  imports: [SequelizeModule.forFeature([UserContactModel])],
  providers: [UserContactService],
})
export class UserContactModule {}
