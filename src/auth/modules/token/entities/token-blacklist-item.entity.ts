import { ITokenBlacklistItem } from 'src/shared/domain/interfaces/token-blacklist-item.interface';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class TokenBlacklistItemEntity
  extends BaseEntity
  implements ITokenBlacklistItem
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'access_token' })
  accessToken: string;

  @Column('varchar', { name: 'refresh_token' })
  refreshToken: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: Date;
}
