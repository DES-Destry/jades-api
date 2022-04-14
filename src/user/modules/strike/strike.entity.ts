import { UserStrikeLevel } from 'src/shared/domain/common/user-strike-level';
import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';
import { UserStrikeAppeal } from 'src/shared/domain/user-strike-appeal';
import { DateAudit } from 'src/shared/entities/date-audit';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('user_strikes')
export class UserStrikeEntity extends DateAudit implements IUserStrike {
  @Column('varchar', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity) // TODO: add strikes in UserEntity
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('varchar', { name: 'issuer_id' })
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

  @Column('varchar', { name: 'appeal_id', nullable: true, unique: true })
  appealId?: string;

  @OneToOne(() => UserStrikeAppeal, (entity) => entity.strike)
  @JoinColumn({ name: 'appeal_id' })
  appeal: UserStrikeAppeal;

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
