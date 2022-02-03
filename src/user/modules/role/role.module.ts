import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRolePrivilegeModule } from './modules/privilege/privilege.module';
import { UserRoleRepository } from './repository/role.repository';
import { UserRoleModel } from './role.model';
import { UserRoleService } from './role.service';

@Module({
  imports: [
    SequelizeModule.forFeature([UserRoleModel]),
    UserRolePrivilegeModule,
  ],
  providers: [UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
