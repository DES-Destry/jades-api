import { AggregateRoot } from 'src/shared/ddd/domain/base-classes/aggregate-root.base';
import { ID } from 'src/shared/ddd/domain/value-objects/id.value-object';
import { UUID } from 'src/shared/ddd/domain/value-objects/uuid.value-object';
import { UserGender } from 'src/shared/domain/common/user-gender';
import { UserScope } from '../../../shared/domain/common/user-interests';
import { IUser } from './user.interface';
import { Credentials } from './value-objects/credentials.vo';

export interface ICreateUserProps {
  username: string;
  password: string;
  gender: UserGender;
  scope: UserScope;
}

export class User extends AggregateRoot<IUser> {
  protected readonly _id: ID;

  public readonly credentials = this.props.credentials;
  public readonly alias? = this.props.alias;
  public readonly urlAlias? = this.props.urlAlias;
  public readonly description? = this.props.description;
  public readonly gender = this.props.gender;
  public readonly emails = this.props.emails;
  public readonly karma = this.props.karma;
  public readonly location? = this.props.location;
  public readonly role? = this.props.role;
  public readonly contacts = this.props.contacts;
  public readonly scope = this.props.scope;
  public readonly company? = this.props.company;
  public readonly lastPasswordChangedAt = this.props.lastPasswordChangedAt;

  public static create(creationProps: ICreateUserProps): User {
    const id = UUID.generate();
    const props: IUser = {
      ...creationProps,
      credentials: new Credentials({
        username: creationProps.username,
        password: creationProps.password,
      }),
      emails: [],
      contacts: [],
      karma: 0,
      lastPasswordChangedAt: new Date(),
    };

    return new User({ id, props });
  }

  public validate(): void {
    // TODO make validation
  }

  public getPrimaryMail(): string {
    const emailData = this.emails.find((email) => email.isMain);
    return emailData.email;
  }

  public isVerified(): boolean {
    return this.emails.some(
      (email) => email.identity?.isVerified && email.isMain,
    );
  }
}
