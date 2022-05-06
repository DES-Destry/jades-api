import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserStrikeEntity } from '../../strike.entity';

@Entity('user_strike_appeals')
export class UserStrikeAppealEntity
  extends DateAudit
  implements IUserStrikeAppeal
{
  @Column('varchar', { name: 'appeal_content', length: 4096 })
  appealContent: string;

  @OneToOne(() => UserStrikeEntity, (entity) => entity.appeal)
  strike: UserStrikeEntity;
}
