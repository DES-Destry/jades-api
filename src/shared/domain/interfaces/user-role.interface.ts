import { IUserRolePrivilege } from './user-role-privilege.interface';

export interface IUserRole {
  id?: string;
  name: string;
  privileges?: IUserRolePrivilege[];
  createdAt?: Date;
  updatedAt?: Date;
}
