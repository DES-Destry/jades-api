import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { IRole } from './interfaces/role.interface';

export class Role extends AggregateRoot<IRole> {
  public readonly id? = this.props.id;
  public readonly name = this.props.name;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IRole): Role {
    return new Role({
      ...props,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IRole): Role {
    return new Role(props);
  }
}
