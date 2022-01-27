import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePrivilegeModule } from './modules/role-privilege/role-privilege.module';
import { RoleRepository } from './repository/role.repository';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';

@Module({
  imports: [SequelizeModule.forFeature([RoleModel]), RolePrivilegeModule],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
