import { IRolePrivilege } from './role-privilege.interface';

export interface IRole {
  id?: string;
  name: string;
  privileges?: IRolePrivilege;
  createdAt?: Date;
  updatedAt?: Date;
}
