import {
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserSubscription } from 'src/shared/domain/user-subscription';
import { UserModel } from 'src/user/user.model';

interface UserSubscriptionModelCreationAttributes {
  subscriberId: string;
  writerId: string;
}

@Table({ tableName: 'user_subscriptions' })
export class UserSubscriptionModel extends Model<
  UserSubscription,
  UserSubscriptionModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'subscriber_id' })
  subscriberId: string;

  @BelongsTo(() => UserModel)
  subscriber: UserModel;

  @ForeignKey(() => UserModel)
  @Column({ field: 'writer_id' })
  writerId: string;

  @BelongsTo(() => UserModel)
  writer: UserModel;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;
}
