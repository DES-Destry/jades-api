import { UserStrikeLevel } from 'src/shared/domain/common/user-strike-level';
import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';
import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_strikes')
export class UserStrikeModel extends DateAudit implements IUserStrike {
  @Column('varchar', { name: 'user_id' })
  userId: string;
  user?: IUser; // TODO UserEntity

  @Column('varchar', { name: 'issuer_id' })
  issuerId: string;
  issuer?: IUser; // TODO UserEntity

  @Column('enum', { enum: UserStrikeLevel })
  level: UserStrikeLevel;

  @Column('varchar', { length: 1024 })
  reason: string;

  @Column('timestamp', { name: 'expired_at' })
  expiredAt: Date;

  @Column('varchar', { name: 'appeal_id', nullable: true, unique: true })
  appealId?: string;
  appeal: IUserStrikeAppeal; // TODO UserStrikeAppealEntity

  @Column('timestamp', { name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
