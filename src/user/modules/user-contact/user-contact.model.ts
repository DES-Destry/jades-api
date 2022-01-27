import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserContact } from 'src/shared/domain/user-contact';
import { UserModel } from 'src/user/user.model';

interface UserContactModelCreationAttributes {
  userId: string;
  mediaType: string;
  link: string;
}

@Table({ tableName: 'user_contacts' })
export class UserContactModel extends Model<
  UserContact,
  UserContactModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id: string;

  @ForeignKey(() => UserModel)
  @Column({ field: 'user_id' })
  userId: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @Column
  title: string;

  @AllowNull
  @Column
  description?: string;

  @Column({ field: 'media_type' })
  mediaType: string;

  @Column
  link: string;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt?: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt?: Date;
}
