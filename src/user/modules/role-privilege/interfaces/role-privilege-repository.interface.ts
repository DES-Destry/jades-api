import {
  IRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/role-privilege.interface';

export interface IRolePrivilegeRepository {
  getById(id: string): Promise<IRolePrivilege>;

  createRolePrivilege(
    roleId: string,
    privilege: Privilege,
  ): Promise<IRolePrivilege>;

  deleteRolePrivilege(privilegeId: string): Promise<boolean>;
}
