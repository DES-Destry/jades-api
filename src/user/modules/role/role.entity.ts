import { IUserRolePrivilege } from 'src/shared/domain/interfaces/user-role-privilege.interface';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_roles')
export class UserRoleEntity extends DateAudit implements IUserRole {
  @Column('varchar')
  name: string;
  privileges?: IUserRolePrivilege[]; // TODO UserRolePrivilegeEntity[]
}
