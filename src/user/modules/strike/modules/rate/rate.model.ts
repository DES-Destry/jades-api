import { v4 as uuid } from 'uuid';
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
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { RateType } from 'src/shared/domain/common/rate-type';
import { UserStrikeRate } from 'src/shared/domain/user-strike-rate';
import { UserModel } from 'src/user/user.model';

interface UserStrikeRateModelCreationAttributes {
  rateType: RateType;
  userId: string;
}

@Table({ tableName: 'user_strike_rates' })
export class UserStrikeRateModel extends Model<
  UserStrikeRate,
  UserStrikeRateModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @Column({
    field: 'rate_type',
    type: DataType.INTEGER,
  })
  rateType: RateType;

  @Unique(true)
  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @BelongsTo(() => UserModel)
  user?: UserModel;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
