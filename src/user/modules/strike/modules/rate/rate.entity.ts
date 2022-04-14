import { RateType } from 'src/shared/domain/common/rate-type';
import { IUserStrikeRate } from 'src/shared/domain/interfaces/user-strike-rate.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_strike_rates')
export class UserStrikeRateEntity extends DateAudit implements IUserStrikeRate {
  @Column('enum', { enum: RateType })
  rateType: RateType;

  @Column('varchar', { name: 'user_id' })
  userId: string;
  user?: IUser; // TODO UserEntity
}
