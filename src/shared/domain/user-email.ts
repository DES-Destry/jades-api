import { AggregateRoot } from './abstract/aggregate-root';
import { IUserEmail } from './interfaces/user-email.interface';

export class UserEmail extends AggregateRoot<IUserEmail> {
  public readonly id = this.props.id;
  public readonly userId = this.props.userId;
  public readonly user? = this.props.user;
  public readonly email = this.props.email;
  public readonly isMain = this.props.isMain;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserEmail): UserEmail {
    return new UserEmail({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
