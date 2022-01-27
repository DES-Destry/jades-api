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
import { Role } from 'src/shared/domain/role';
import { RolePrivilegeModel } from './modules/role-privilege/role-privilege.model';

interface RoleModelCreationAttributes {
  name: string;
}

@Table({ tableName: 'roles' })
export class RoleModel extends Model<Role, RoleModelCreationAttributes> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @Column
  name: string;

  @HasMany(() => RolePrivilegeModel)
  privileges: RolePrivilegeModel[];

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
