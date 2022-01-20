import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleRepository } from './repository/role.repository';
import { RoleModel } from './role.model';
import { RoleService } from './role.service';

@Module({
  imports: [SequelizeModule.forFeature([RoleModel])],
  providers: [RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
