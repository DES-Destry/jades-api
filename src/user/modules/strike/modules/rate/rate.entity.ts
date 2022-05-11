import { RateType } from 'src/shared/domain/common/rate-type';
import { IUserStrikeRate } from 'src/shared/domain/interfaces/user-strike-rate.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_strike_rates')
export class UserStrikeRateEntity extends DateAudit implements IUserStrikeRate {
  @Column('enum', { name: 'rate_type', enum: RateType })
  rateType: RateType;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity) // TODO add strikeRates in UserEntity
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
