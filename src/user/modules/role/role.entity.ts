import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { UserRolePrivilegeEntity } from './modules/privilege/privilege.entity';

@Entity('user_roles')
export class UserRoleEntity extends DateAudit implements IUserRole {
  @Column('varchar')
  name: string;

  @OneToMany(() => UserEntity, (entity) => entity.role)
  users: UserEntity;

  @OneToMany(() => UserRolePrivilegeEntity, (entity) => entity.role)
  @JoinTable()
  privileges?: UserRolePrivilegeEntity[];
}
