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
import { Privilege } from 'src/shared/domain/interfaces/role-privilege.interface';
import { RolePrivilege } from 'src/shared/domain/role-privilege';
import { RoleModel } from '../../role.model';

interface RolePrivilegeModelCreationAttributes {
  roleId: string;
  privilege: Privilege;
}

@Table({ tableName: 'role_privileges' })
export class RolePrivilegeModel extends Model<
  RolePrivilege,
  RolePrivilegeModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @ForeignKey(() => RoleModel)
  @Column({ field: 'role_id' })
  roleId: string;

  @BelongsTo(() => RoleModel)
  role?: RoleModel;

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
