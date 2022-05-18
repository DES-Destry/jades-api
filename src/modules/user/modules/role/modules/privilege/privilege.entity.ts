import {
  IUserRolePrivilege,
  Privilege,
} from 'src/shared/domain/interfaces/user-role-privilege.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserRoleEntity } from '../../role.entity';

@Entity('user_role_privileges')
export class UserRolePrivilegeEntity
  extends BaseDateEntity
  implements IUserRolePrivilege
{
  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @ManyToOne(() => UserRoleEntity, (entity) => entity.privileges)
  @JoinColumn({ name: 'role_id' })
  role?: UserRoleEntity;

  @Column('enum', { enum: Privilege })
  privilege: Privilege;
}
