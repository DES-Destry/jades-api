import { IRole } from 'src/shared/domain/interfaces/role.interface';

export interface IRoleRepository {
  getById(id: string): Promise<IRole>;

  createRole(name: string): Promise<IRole>;

  deleteRole(roleId: string): Promise<boolean>;
}
