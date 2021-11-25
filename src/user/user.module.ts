import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEmailModule } from 'src/user-email/user-email.module';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), UserEmailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
