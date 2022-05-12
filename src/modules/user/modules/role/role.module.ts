import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolePrivilegeModule } from './modules/privilege/privilege.module';
import { UserRoleRepository } from './repository/role.repository';
import { UserRoleEntity } from './role.entity';
import { UserRoleService } from './role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRoleEntity]),
    UserRolePrivilegeModule,
  ],
  providers: [
    UserRoleService,
    {
      provide: 'IUserRoleRepository',
      useClass: UserRoleRepository,
    },
  ],
  exports: [UserRoleService],
})
export class UserRoleModule {}
