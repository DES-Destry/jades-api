import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IRolePrivilege } from './interfaces/role-privilege.interface';

export class RolePrivilege extends AggregateRoot<IRolePrivilege> {
  public readonly id = this.props.id;
  public readonly roleId = this.props.roleId;
  public readonly role? = this.props.role;
  public readonly privilege = this.props.privilege;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IRolePrivilege): RolePrivilege {
    return new RolePrivilege({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IRolePrivilege): RolePrivilege {
    return new RolePrivilege(props);
  }
}
