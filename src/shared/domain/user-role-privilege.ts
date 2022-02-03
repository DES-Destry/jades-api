import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IUserRolePrivilege } from './interfaces/user-role-privilege.interface';

export class UserRolePrivilege extends AggregateRoot<IUserRolePrivilege> {
  public readonly id = this.props.id;
  public readonly roleId = this.props.roleId;
  public readonly role? = this.props.role;
  public readonly privilege = this.props.privilege;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserRolePrivilege): UserRolePrivilege {
    return new UserRolePrivilege({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserRolePrivilege): UserRolePrivilege {
    return new UserRolePrivilege(props);
  }
}
