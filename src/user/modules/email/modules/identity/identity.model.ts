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
  Unique,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserEmailIdentity } from 'src/shared/domain/user-email-identity';
import { UserEmailModel } from '../../email.model';

interface UserEmailIdentityModelCreationAttributes {
  emailId: string;
  verificationCode: string;
}

@Table({ tableName: 'user_email_identities' })
export class UserEmailIdentityModel extends Model<
  UserEmailIdentity,
  UserEmailIdentityModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @ForeignKey(() => UserEmailModel)
  @Unique
  @Column({ field: 'email_id' })
  emailId: string;

  @BelongsTo(() => UserEmailModel)
  email: UserEmailModel;

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
