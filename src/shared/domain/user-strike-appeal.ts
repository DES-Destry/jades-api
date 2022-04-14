import { AggregateRoot } from './abstract/aggregate-root';
import { IUserStrikeAppeal } from './interfaces/user-strike-appeal.interface';

export class UserStrikeAppeal extends AggregateRoot<IUserStrikeAppeal> {
  public readonly id? = this.props.id;
  public readonly appealContent = this.props.appealContent;
  public readonly strike = this.props.strike;
  public readonly createdAt? = this.props.createdAt;
  public readonly updatedAt? = this.props.updatedAt;

  public static create(props: IUserStrikeAppeal): UserStrikeAppeal {
    return new UserStrikeAppeal({
      ...props,
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IUserStrikeAppeal): UserStrikeAppeal {
    return new UserStrikeAppeal(props);
  }
}
