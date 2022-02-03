import {
  Column,
  CreatedAt,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserRole } from 'src/shared/domain/user-role';
import { UserRolePrivilegeModel } from './modules/privilege/privilege.model';

interface UserRoleModelCreationAttributes {
  name: string;
}

@Table({ tableName: 'user_roles' })
export class UserRoleModel extends Model<
  UserRole,
  UserRoleModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @Column
  name: string;

  @HasMany(() => UserRolePrivilegeModel)
  privileges: UserRolePrivilegeModel[];

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
