import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserRole } from './interfaces/user-role.interface';

export class UserRole extends AggregateRoot<IUserRole> {
  public readonly id? = this.props.id;
  public readonly name = this.props.name;
  public readonly privileges? = this.props.privileges;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserRole): UserRole {
    return new UserRole({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserRole): UserRole {
    return new UserRole(props);
  }
}
