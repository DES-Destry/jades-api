import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { UserEntity } from 'src/modules/user/infrastructure/user.entity';
import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { UserRolePrivilegeEntity } from './modules/privilege/privilege.entity';

@Entity('user_roles')
export class UserRoleEntity extends BaseDateEntity implements IUserRole {
  @Column('varchar')
  name: string;

  @OneToMany(() => UserEntity, (entity) => entity.role)
  users: UserEntity;

  @OneToMany(() => UserRolePrivilegeEntity, (entity) => entity.role)
  @JoinTable()
  privileges?: UserRolePrivilegeEntity[];
}
