import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePrivilegeRepository } from './repositories/role-privilege.repository';
import { RolePrivilegeModel } from './role-privilege.model';
import { RolePrivilegeService } from './role-privilege.service';

@Module({
  imports: [SequelizeModule.forFeature([RolePrivilegeModel])],
  providers: [RolePrivilegeService, RolePrivilegeRepository],
  exports: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
