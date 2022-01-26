import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserStrikeLevel } from 'src/shared/domain/common/user-strike-level';
import { UserStrike } from 'src/shared/domain/user-strike';
import { UserModel } from 'src/user/user.model';

export interface UserStrikeModelCreationAttributes {
  userId: string;
  issuerId: string;
  level: UserStrikeLevel;
  reason: string;
  expiredAt: Date;
}

@Table({ tableName: 'user_strikes' })
export class UserStrikeModel extends Model<
  UserStrike,
  UserStrikeModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @BelongsTo(() => UserModel)
  user?: UserModel;

  @ForeignKey(() => UserModel)
  @Column({ field: 'issuer_id' })
  issuerId: string;

  @BelongsTo(() => UserModel)
  issuer?: UserModel;

  @Column({ type: DataType.STRING })
  level: UserStrikeLevel;

  @Column
  reason: string;

  @Column
  expiredAt: Date;

  @AllowNull
  @Column({ field: 'appeal_id' })
  appealId?: string;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Default(null)
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
