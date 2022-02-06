import { ApiProperty } from '@nestjs/swagger';
import { IUserRole, UserRoleDoc } from './user-role.interface';

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

export abstract class UserRolePrivilegeDoc implements IUserRolePrivilege {
  @ApiProperty({
    description: 'ID of privilege.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c216',
  })
  id?: string;

  @ApiProperty({
    description: 'ID of role with that privilege linked.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c215',
  })
  roleId: string;

  @ApiProperty({
    type: UserRoleDoc,
  })
  role?: IUserRole;

  @ApiProperty({
    description: 'Kind of privilege.',
    example: Privilege.StrikeUsers,
    enum: Privilege,
  })
  privilege: Privilege;

  @ApiProperty({
    description: "Date of role's creating.",
    example: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    description:
      "Date of role's fields changing. Changes when any parameters of user was changed.",
    example: new Date(),
  })
  updatedAt?: Date;
}
