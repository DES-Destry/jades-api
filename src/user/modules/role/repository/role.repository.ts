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
    if (!id) {
      return null;
    }

    const model = await this._roleModel.findByPk(id);
    return model && Role.transform(model);
  }

  public async createRole(name: string): Promise<IRole> {
    if (!name) {
      return null;
    }

    const roleDomain = Role.create({ name });
    await this._roleModel.create(roleDomain);
    return roleDomain;
  }

  public async deleteRole(roleId: string): Promise<boolean> {
    if (!roleId) {
      return false;
    }

    const count = await this._roleModel.destroy({
      where: { id: roleId },
    });
    return count > 0;
  }
}
