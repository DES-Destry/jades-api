import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRolePrivilegeRepository } from './repositories/privilege.repository';
import { UserRolePrivilegeModel } from './privilege.model';
import { UserRolePrivilegeService } from './privilege.service';

@Module({
  imports: [SequelizeModule.forFeature([UserRolePrivilegeModel])],
  providers: [UserRolePrivilegeService, UserRolePrivilegeRepository],
  exports: [UserRolePrivilegeService],
})
export class UserRolePrivilegeModule {}
