import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserEmailIdentity } from './interfaces/user-email-identity.interface';

export class UserEmailIdentity extends AggregateRoot<IUserEmailIdentity> {
  public readonly id? = this.props.id;
  public readonly emailId = this.props.emailId;
  public readonly email? = this.props.email;
  public readonly verificationCode = this.props.verificationCode;
  public readonly isVerified = this.props.isVerified;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserEmailIdentity): UserEmailIdentity {
    return new UserEmailIdentity({
      ...props,
      id: uuid(),
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserEmailIdentity): UserEmailIdentity {
    return new UserEmailIdentity(props);
  }
}
