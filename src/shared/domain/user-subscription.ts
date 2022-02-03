import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserSubscription } from './interfaces/user-subscription.interface';

export class UserSubscription extends AggregateRoot<IUserSubscription> {
  public readonly id? = this.props.id;
  public readonly subscriberId = this.props.subscriberId;
  public readonly subscriber? = this.props.subscriber;
  public readonly writerId = this.props.writerId;
  public readonly writer? = this.props.writer;
  public readonly createdAt? = this.props.createdAt;

  public static create(props: IUserSubscription): UserSubscription {
    return new UserSubscription({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    });
  }

  public static transform(props: IUserSubscription): UserSubscription {
    return new UserSubscription(props);
  }
}
