import {
  IUserRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/user-role-privilege.interface';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_role_privileges')
export class UserRolePrivilegeEntity
  extends DateAudit
  implements IUserRolePrivilege
{
  @Column('varchar', { name: 'role_id' })
  roleId: string;
  role?: IUserRole; // TODO UserRoleEntity

  @Column('enum', { enum: Privilege })
  privilege: Privilege;
}
