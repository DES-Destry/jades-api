import { RateType } from 'src/shared/domain/common/rate-type';
import { IUserStrikeRate } from 'src/shared/domain/interfaces/user-strike-rate.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { UserEntity } from 'src/modules/user/infrastructure/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_strike_rates')
export class UserStrikeRateEntity extends BaseDateEntity implements IUserStrikeRate {
  @Column('enum', { name: 'rate_type', enum: RateType })
  rateType: RateType;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity) // TODO add strikeRates in UserEntity
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
