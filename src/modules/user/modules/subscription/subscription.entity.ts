import { IUserSubscription } from 'src/shared/domain/interfaces/user-subscription.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { UserEntity } from 'src/modules/user/infrastructure/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user_subscriptions')
export class UserSubscriptionEntity
  extends BaseDateEntity
  implements IUserSubscription
{
  @Column('uuid', { name: 'subscriber_id' })
  subscriberId: string;

  @ManyToOne(() => UserEntity) // TODO Add subscriptions field in user entity
  @JoinColumn({ name: 'subscriber_id' })
  subscriber?: UserEntity;

  @Column('uuid', { name: 'writer_id' })
  writerId: string;

  @ManyToOne(() => UserEntity) // TODO Add subscribers field in user entity
  @JoinColumn({ name: 'writer_id' })
  writer?: UserEntity;
}
