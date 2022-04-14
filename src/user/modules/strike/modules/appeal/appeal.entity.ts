import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';
import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_strike_appeals')
export class UserStrikeAppealEntity
  extends DateAudit
  implements IUserStrikeAppeal
{
  @Column('varchar', { length: 4096 })
  appealContent: string;
  strike: IUserStrike; // TODO UserStrikeEntity
}
