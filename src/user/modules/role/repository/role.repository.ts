import { InjectModel } from '@nestjs/sequelize';
import { IRole } from 'src/shared/domain/interfaces/role.interface';
import { Role } from 'src/shared/domain/role';
import { IRoleRepository } from '../interfaces/role-repository.interface';
import { RoleModel } from '../role.model';

export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectModel(RoleModel) private readonly _roleModel: typeof RoleModel,
  ) {}

  public async getById(id: string): Promise<IRole> {
    const model = await this._roleModel.findByPk(id);
    return model && Role.transform(model);
  }

  public async createRole(name: string): Promise<IRole> {
    const roleDomain = Role.create({ name });
    await this._roleModel.create(roleDomain);
    return roleDomain;
  }
  public async addRolePrivilege(
    roleId: string,
    privilegeId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async deleteRolePrivilege(
    roleId: string,
    privilegeId: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async deleteRole(roleId: string): Promise<boolean> {
    const count = await this._roleModel.destroy({
      where: { id: roleId },
    });
    return count > 0;
  }
}
