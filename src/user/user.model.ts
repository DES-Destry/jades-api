import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { User } from 'src/shared/domain/user';
import { UserEmailModel } from 'src/user/modules/user-email/user-email.model';
import { UserIdentityModel } from './modules/user-identity/user-identity.model';
import { RoleModel } from './modules/role/role.model';

interface UserModelCreationAttributes {
  username: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<User, UserModelCreationAttributes> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id: string;

  @Unique(true)
  @Column
  username: string;

  @AllowNull
  @Column
  alias?: string;

  @Unique(true)
  @AllowNull
  @Column({ field: 'url_alias' })
  urlAlias?: string;

  @AllowNull
  @Column
  description?: string;

  @HasMany(() => UserEmailModel)
  emails: UserEmailModel[];

  @Column
  password: string;

  @Default(0)
  @Column
  karma: number;

  @Column
  location?: string;

  @AllowNull
  @ForeignKey(() => RoleModel)
  @Column({ field: 'role_id' })
  roleId?: string;

  @BelongsTo(() => RoleModel)
  role?: RoleModel;

  @HasMany(() => UserIdentityModel)
  userIdentities: UserIdentityModel[];

  @Default(false)
  @Column({ field: 'is_verified' })
  isVerified: boolean;

  @Default(new Date())
  @Column({ field: 'last_password_changed' })
  lastPasswordChanged: Date;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
