import {
  Model,
  Table,
  Column,
  PrimaryKey,
  Default,
  Unique,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { User } from 'src/shared/domain/user';
import { UserEmail } from 'src/shared/domain/user-email';
import { UserModel } from 'src/user/user.model';

interface UserEmailModelCreationAttributes {
  userId: string;
  email: string;
  isMain: boolean;
}

@Table({ tableName: 'user_emails' })
export class UserEmailModel extends Model<
  UserEmail,
  UserEmailModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @BelongsTo(() => UserModel)
  user: User;

  @Unique(true)
  @Column
  email: string;

  @Column({ field: 'is_main' })
  isMain: boolean;

  @Default(false)
  @Column({ field: 'is_visible' })
  isVisible: boolean;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
