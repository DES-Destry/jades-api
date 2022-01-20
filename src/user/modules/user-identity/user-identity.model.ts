import {
  Model,
  Table,
  Column,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserIdentity } from 'src/shared/domain/user-identity';
import { UserModel } from 'src/user/user.model';

interface UserIdentityModelCreationAttributes {
  userId: string;
  verificationCode: string;
}

@Table({ tableName: 'user_identities' })
export class UserIdentityModel extends Model<
  UserIdentity,
  UserIdentityModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column({ field: 'verification_code' })
  verificationCode: string;

  @Default(false)
  @Column({ field: 'is_verified' })
  isVerified: boolean;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
