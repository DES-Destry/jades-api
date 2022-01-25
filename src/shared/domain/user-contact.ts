import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserContact } from './interfaces/user-contact.interface';

export class UserContact extends AggregateRoot<IUserContact> {
  public readonly id = this.props.id;
  public readonly userId = this.props.userId;
  public readonly user? = this.props.user;
  public readonly title = this.props.title;
  public readonly description? = this.props.description;
  public readonly mediaType = this.props.mediaType;
  public readonly link = this.props.link;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserContact): UserContact {
    return new UserContact({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserContact): UserContact {
    return new UserContact(props);
  }
}
