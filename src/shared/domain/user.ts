import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { UserScope } from './common/user-interests';
import { IUser } from './interfaces/user.interface';

export class User extends AggregateRoot<IUser> {
  public readonly id? = this.props.id;
  public readonly username = this.props.username;
  public readonly alias? = this.props.alias;
  public readonly urlAlias? = this.props.urlAlias;
  public readonly description? = this.props.description;
  public readonly gender = this.props.gender;
  public readonly emails = this.props.emails;
  public readonly password = this.props.password;
  public readonly karma = this.props.karma;
  public readonly location? = this.props.location;
  public readonly roleId? = this.props.roleId;
  public readonly role? = this.props.role;
  public readonly contacts = this.props.contacts;
  public readonly scope = this.props.scope;
  public readonly company? = this.props.company;
  public readonly userIdentities = this.props.userIdentities;
  public readonly isVerified = this.props.isVerified;
  public readonly lastPasswordChanged = this.props.lastPasswordChanged;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUser): User {
    return new User({
      scope: UserScope.Other,
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
