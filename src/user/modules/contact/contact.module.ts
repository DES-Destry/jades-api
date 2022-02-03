import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserContactModel } from './contact.model';
import { UserContactService } from './contact.service';

@Module({
  imports: [SequelizeModule.forFeature([UserContactModel])],
  providers: [UserContactService],
})
export class UserContactModule {}
