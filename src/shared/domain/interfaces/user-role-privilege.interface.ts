import { IUserRole } from './user-role.interface';

export enum Privilege {
  GodMode = 'GOD_MODE',
  DeleteUsers = 'DELETE_USERS',
  DeletePosts = 'DELETE_POSTS',
  StrikeUsers = 'STRIKE_USERS',
  StrikePosts = 'STRIKE_POSTS',
  EditRoles = 'EDIT_ROLES',
  EditPrivileges = 'EDIT_PRIVILEGES',
}

export interface IUserRolePrivilege {
  id?: string;
  roleId: string;
  role?: IUserRole;
  privilege: Privilege;
  createdAt?: Date;
  updatedAt?: Date;
}
