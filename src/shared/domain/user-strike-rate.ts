import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserStrikeRate } from './interfaces/user-strike-rate.interface';

export class UserStrikeRate extends AggregateRoot<IUserStrikeRate> {
  public readonly id = this.props.id;
  public readonly rateType = this.props.rateType;
  public readonly userId = this.props.userId;
  public readonly user? = this.props.user;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserStrikeRate): UserStrikeRate {
    return new UserStrikeRate({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserStrikeRate): UserStrikeRate {
    return new UserStrikeRate(props);
  }
}
