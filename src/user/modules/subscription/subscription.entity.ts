import { IUserSubscription } from 'src/shared/domain/interfaces/user-subscription.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_subscriptions')
export class UserSubscriptionEntity
  extends DateAudit
  implements IUserSubscription
{
  @Column('varchar', { name: 'subscriber_id' })
  subscriberId: string;

  @ManyToOne(() => UserEntity) // TODO Add subscriptions field in user entity
  @JoinColumn({ name: 'subscriber_id' })
  subscriber?: UserEntity;

  @Column('varchar', { name: 'writer_id' })
  writerId: string;

  @ManyToOne(() => UserEntity) // TODO Add subscribers field in user entity
  @JoinColumn({ name: 'writer_id' })
  writer?: UserEntity;
}
