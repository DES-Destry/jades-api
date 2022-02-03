import { InjectModel } from '@nestjs/sequelize';
import {
  IUserRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/user-role-privilege.interface';
import { UserRolePrivilege } from 'src/shared/domain/user-role-privilege';
import { IUserRolePrivilegeRepository } from '../interfaces/privilege-repository.interface';
import { UserRolePrivilegeModel } from '../privilege.model';

export class UserRolePrivilegeRepository
  implements IUserRolePrivilegeRepository
{
  constructor(
    @InjectModel(UserRolePrivilegeModel)
    private readonly _rolePrivilegeModel: typeof UserRolePrivilegeModel,
  ) {}

  public async getById(id: string): Promise<IUserRolePrivilege> {
    if (!id) {
      return null;
    }

    const model = await this._rolePrivilegeModel.findByPk(id);
    return model && UserRolePrivilege.transform(model);
  }

  public async createRolePrivilege(
    roleId: string,
    privilege: Privilege,
  ): Promise<IUserRolePrivilege> {
    if (!roleId || !privilege) {
      return null;
    }

    const rolePrivilegeDomain = UserRolePrivilege.create({ roleId, privilege });
    await this._rolePrivilegeModel.create(rolePrivilegeDomain);

    return rolePrivilegeDomain;
  }

  public async deleteRolePrivilege(privilegeId: string): Promise<boolean> {
    if (!privilegeId) {
      return null;
    }

    const count = await this._rolePrivilegeModel.destroy({
      where: { id: privilegeId },
    });
    return count > 0;
  }
}
