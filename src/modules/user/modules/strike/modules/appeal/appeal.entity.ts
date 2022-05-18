import { IUserStrikeAppeal } from 'src/shared/domain/interfaces/user-strike-appeal.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { UserStrikeEntity } from '../../strike.entity';

@Entity('user_strike_appeals')
export class UserStrikeAppealEntity
  extends BaseDateEntity
  implements IUserStrikeAppeal
{
  @Column('varchar', { name: 'appeal_content', length: 4096 })
  appealContent: string;

  @OneToOne(() => UserStrikeEntity, (entity) => entity.appeal)
  strike: UserStrikeEntity;
}
