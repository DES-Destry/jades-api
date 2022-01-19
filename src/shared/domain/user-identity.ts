import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserIdentity } from './interfaces/user-identity.interface';

export class UserIdentity extends AggregateRoot<IUserIdentity> {
  public readonly id? = this.props.id;
  public readonly userId = this.props.userId;
  public readonly user = this.props.user;
  public readonly verificationCode = this.props.verificationCode;
  public readonly isVerified = this.props.isVerified;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserIdentity): UserIdentity {
    return new UserIdentity({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserIdentity): UserIdentity {
    return new UserIdentity(props);
  }
}
