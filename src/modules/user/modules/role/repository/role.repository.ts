import { InjectRepository } from '@nestjs/typeorm';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { UserRole } from 'src/shared/domain/user-role';
import { Repository } from 'typeorm';
import { IUserRoleRepository } from '../interfaces/role-repository.interface';
import { UserRoleEntity } from '../role.entity';

export class UserRoleRepository implements IUserRoleRepository {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly _roleEntity: Repository<UserRoleEntity>,
  ) {}

  public async getById(id: string): Promise<IUserRole> {
    if (!id) {
      return null;
    }

    const entity = await this._roleEntity.findOne(id);
    return entity && UserRole.transform(entity);
  }

  public async createRole(name: string): Promise<IUserRole> {
    if (!name) {
      return null;
    }

    const roleDomain = UserRole.create({ name });
    const createdEntity = this._roleEntity.create(roleDomain);
    await createdEntity.save();
    return roleDomain;
  }

  public async deleteRole(roleId: string): Promise<boolean> {
    if (!roleId) {
      return false;
    }

    const deleteResult = await this._roleEntity.delete({ id: roleId });
    return deleteResult.affected > 0;
  }
}
