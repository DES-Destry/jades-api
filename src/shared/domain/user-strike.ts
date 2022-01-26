import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserStrike } from './interfaces/user-strike.interface';

export class UserStrike extends AggregateRoot<IUserStrike> {
  public readonly id? = this.props.id;
  public readonly userId = this.props.userId;
  public readonly user? = this.props.user;
  public readonly issuerId = this.props.issuerId;
  public readonly issuer? = this.props.issuer;
  public readonly level = this.props.level;
  public readonly reason = this.props.reason;
  public readonly expiredAt = this.props.expiredAt;
  public readonly appealId? = this.props.appealId;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;
  public readonly deletedAt? = this.props.deletedAt;

  public static create(props: IUserStrike): UserStrike {
    return new UserStrike({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }

  public static transform(props: IUserStrike): UserStrike {
    return new UserStrike(props);
  }

  public isDeleted(): boolean {
    return Boolean(this.deletedAt);
  }
}
