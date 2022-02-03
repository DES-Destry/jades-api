import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { Privilege } from 'src/shared/domain/interfaces/user-role-privilege.interface';
import { UserRolePrivilege } from 'src/shared/domain/user-role-privilege';
import { UserRoleModel } from '../../role.model';

interface UserRolePrivilegeModelCreationAttributes {
  roleId: string;
  privilege: Privilege;
}

@Table({ tableName: 'user_role_privileges' })
export class UserRolePrivilegeModel extends Model<
  UserRolePrivilege,
  UserRolePrivilegeModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @ForeignKey(() => UserRoleModel)
  @Column({ field: 'role_id' })
  roleId: string;

  @BelongsTo(() => UserRoleModel)
  role?: UserRoleModel;

  @Column({
    field: 'privilege',
    type: DataType.STRING,
  })
  privilege: Privilege;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
