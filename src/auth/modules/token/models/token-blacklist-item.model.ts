import {
  Column,
  CreatedAt,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { TokenBlacklistItem } from 'src/shared/domain/token-blacklist-item';

interface TokenBlacklistItemModelCreationAttributes {
  accessTokenBlocked: string;
  refreshTokenBlocked: string;
}

@Table({ tableName: 'token_blacklist' })
export class TokenBlacklistItemModel extends Model<
  TokenBlacklistItem,
  TokenBlacklistItemModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id: string;

  @Column({ field: 'access_token' })
  accessToken: string;

  @Column({ field: 'refresh_token' })
  refreshToken: string;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;
}
