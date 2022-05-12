import { Module } from '@nestjs/common';
import { UserRolePrivilegeRepository } from './repositories/privilege.repository';
import { UserRolePrivilegeService } from './privilege.service';
import { UserRolePrivilegeEntity } from './privilege.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserRolePrivilegeEntity])],
  providers: [
    UserRolePrivilegeService,
    {
      provide: 'IUserRolePrivilegeRepository',
      useClass: UserRolePrivilegeRepository,
    },
  ],
  exports: [UserRolePrivilegeService],
})
export class UserRolePrivilegeModule {}
