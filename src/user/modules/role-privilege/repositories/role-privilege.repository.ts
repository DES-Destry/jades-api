import { InjectModel } from '@nestjs/sequelize';
import {
  IRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/role-privilege.interface';
import { RolePrivilege } from 'src/shared/domain/role-privilege';
import { IRolePrivilegeRepository } from '../interfaces/role-privilege-repository.interface';
import { RolePrivilegeModel } from '../role-privilege.model';

export class RolePrivilegeRepository implements IRolePrivilegeRepository {
  constructor(
    @InjectModel(RolePrivilegeModel)
    private readonly _rolePrivilegeModel: typeof RolePrivilegeModel,
  ) {}

  public async getById(id: string): Promise<IRolePrivilege> {
    if (!id) {
      return null;
    }

    const model = await this._rolePrivilegeModel.findByPk(id);
    return model && RolePrivilege.transform(model);
  }

  public async createRolePrivilege(
    roleId: string,
    privilege: Privilege,
  ): Promise<IRolePrivilege> {
    const rolePrivilegeDomain = RolePrivilege.create({ roleId, privilege });
    await this._rolePrivilegeModel.create(rolePrivilegeDomain);

    return rolePrivilegeDomain;
  }

  public async deleteRolePrivilege(privilegeId: string): Promise<boolean> {
    const count = await this._rolePrivilegeModel.destroy({
      where: { id: privilegeId },
    });
    return count > 0;
  }
}
