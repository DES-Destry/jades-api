import { InjectRepository } from '@nestjs/typeorm';
import {
  IUserRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/user-role-privilege.interface';
import { UserRolePrivilege } from 'src/shared/domain/user-role-privilege';
import { Repository } from 'typeorm';
import { IUserRolePrivilegeRepository } from '../interfaces/privilege-repository.interface';
import { UserRolePrivilegeEntity } from '../privilege.entity';

export class UserRolePrivilegeRepository
  implements IUserRolePrivilegeRepository
{
  constructor(
    @InjectRepository(UserRolePrivilegeEntity)
    private readonly _rolePrivilegeEntity: Repository<UserRolePrivilegeEntity>,
  ) {}

  public async getById(id: string): Promise<IUserRolePrivilege> {
    if (!id) {
      return null;
    }

    const entity = await this._rolePrivilegeEntity.findOne(id);
    return entity && UserRolePrivilege.transform(entity);
  }

  public async createRolePrivilege(
    roleId: string,
    privilege: Privilege,
  ): Promise<IUserRolePrivilege> {
    if (!roleId || !privilege) {
      return null;
    }

    const rolePrivilegeDomain = UserRolePrivilege.create({ roleId, privilege });
    const entity = this._rolePrivilegeEntity.create(rolePrivilegeDomain);
    await entity.save();

    return rolePrivilegeDomain;
  }

  public async deleteRolePrivilege(privilegeId: string): Promise<boolean> {
    if (!privilegeId) {
      return null;
    }

    const deleteResult = await this._rolePrivilegeEntity.delete({
      id: privilegeId,
    });
    return deleteResult.raw > 0;
  }
}
