import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/user/user.module';
import { UserIdentityRepository } from './repositories/user-identity.repository';
import { UserIdentityModel } from './user-identity.model';
import { UserIdentityService } from './user-identity.service';

@Module({
  imports: [SequelizeModule.forFeature([UserIdentityModel]), UserModule],
  providers: [UserIdentityService, UserIdentityRepository],
  exports: [UserIdentityService],
})
export class UserIdentityModule {}
