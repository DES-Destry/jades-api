import { ApiProperty } from '@nestjs/swagger';
import {
  IUserRolePrivilege,
  UserRolePrivilegeDoc,
} from './user-role-privilege.interface';

export interface IUserRole {
  id?: string;
  name: string;
  privileges?: IUserRolePrivilege[];
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class UserRoleDoc implements IUserRole {
  @ApiProperty({
    description: 'ID of role',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c215',
  })
  id?: string;

  @ApiProperty({
    description: 'Name of privilege.',
    example: 'Main Admin',
  })
  name: string;

  @ApiProperty({
    description: 'Privileges of this role',
    type: [UserRolePrivilegeDoc],
  })
  privileges?: IUserRolePrivilege[];

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
