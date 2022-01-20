import { IRole } from 'src/shared/domain/interfaces/role.interface';

export interface IRoleRepository {
  getById(id: string): Promise<IRole>;

  createRole(name: string): Promise<IRole>;
  addRolePrivilege(roleId: string, privilegeId: string): Promise<void>;
  deleteRolePrivilege(roleId: string, privilegeId: string): Promise<void>;

  deleteRole(roleId: string): Promise<boolean>;
}
