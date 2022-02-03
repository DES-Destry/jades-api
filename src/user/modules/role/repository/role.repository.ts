import { InjectModel } from '@nestjs/sequelize';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { UserRole } from 'src/shared/domain/user-role';
import { IUserRoleRepository } from '../interfaces/role-repository.interface';
import { UserRoleModel } from '../role.model';

export class UserRoleRepository implements IUserRoleRepository {
  constructor(
    @InjectModel(UserRoleModel)
    private readonly _roleModel: typeof UserRoleModel,
  ) {}

  public async getById(id: string): Promise<IUserRole> {
    if (!id) {
      return null;
    }

    const model = await this._roleModel.findByPk(id);
    return model && UserRole.transform(model);
  }

  public async createRole(name: string): Promise<IUserRole> {
    if (!name) {
      return null;
    }

    const roleDomain = UserRole.create({ name });
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
