import { UserStrikeLevel } from 'src/shared/domain/common/user-strike-level';
import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';
import { DateAudit } from 'src/shared/date-audit';
import { UserEntity } from 'src/modules/user/infrastructure/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { UserStrikeAppealEntity } from './modules/appeal/appeal.entity';

@Entity('user_strikes')
export class UserStrikeEntity extends DateAudit implements IUserStrike {
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity) // TODO: add strikes in UserEntity
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('uuid', { name: 'issuer_id' })
  issuerId: string;

  @ManyToOne(() => UserEntity) // TODO: add strikeIssuing in UserEntity
  @JoinColumn({ name: 'user_id' })
  issuer?: UserEntity;

  @Column('enum', { enum: UserStrikeLevel })
  level: UserStrikeLevel;

  @Column('varchar', { length: 1024 })
  reason: string;

  @Column('timestamp', { name: 'expired_at' })
  expiredAt: Date;

  @Column('uuid', { name: 'appeal_id', nullable: true, unique: true })
  appealId?: string;

  @OneToOne(() => UserStrikeAppealEntity, (entity) => entity.strike)
  @JoinColumn({ name: 'appeal_id' })
  appeal: UserStrikeAppealEntity;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
