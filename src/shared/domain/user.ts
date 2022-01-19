import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUser } from './interfaces/user.interface';

export class User extends AggregateRoot<IUser> {
  public readonly id? = this.props.id;
  public readonly username = this.props.username;
  public readonly alias? = this.props.alias;
  public readonly urlAlias? = this.props.urlAlias;
  public readonly description? = this.props.description;
  public readonly emails = this.props.emails;
  public readonly password = this.props.password;
  public readonly karma = this.props.karma;
  public readonly location? = this.props.location;
  // public readonly contacts = this.props.contacts;
  public readonly userIdentities = this.props.userIdentities;
  public readonly isVerified = this.props.isVerified;
  public readonly lastPasswordChanged = this.props.lastPasswordChanged;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUser): User {
    return new User({
      ...props,
      id: uuid(),
      karma: 0,
      isVerified: false,
      lastPasswordChanged: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUser): User {
    return new User(props);
  }

  public getPrimaryMail(): string {
    const emailData = this.emails.find((email) => email.isMain);
    return emailData.email;
  }
}
