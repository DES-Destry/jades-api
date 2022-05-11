import {
  IUserRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/user-role-privilege.interface';

export interface IUserRolePrivilegeRepository {
  getById(id: string): Promise<IUserRolePrivilege>;

  createRolePrivilege(
    roleId: string,
    privilege: Privilege,
  ): Promise<IUserRolePrivilege>;

  deleteRolePrivilege(privilegeId: string): Promise<boolean>;
}
