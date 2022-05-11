import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';

export interface IUserRoleRepository {
  getById(id: string): Promise<IUserRole>;

  createRole(name: string): Promise<IUserRole>;

  deleteRole(roleId: string): Promise<boolean>;
}
