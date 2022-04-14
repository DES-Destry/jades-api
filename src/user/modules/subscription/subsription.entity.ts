import { IUserSubscription } from 'src/shared/domain/interfaces/user-subscription.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_subscriptions')
export class UserSubscriptionEntity
  extends DateAudit
  implements IUserSubscription
{
  @Column('varchar', { name: 'subscriber_id' })
  subscriberId: string;
  subscriber?: IUser; // TODO UserEntity

  @Column('varchar', { name: 'writer_id' })
  writerId: string;
  writer?: IUser;
}
