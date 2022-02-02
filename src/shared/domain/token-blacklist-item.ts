import { v4 as uuid } from 'uuid';
import { AggregateRoot } from './abstract/aggregate-root';
import { ITokenBlacklistItem } from './interfaces/token-blacklist-item.interface';

export class TokenBlacklistItem extends AggregateRoot<ITokenBlacklistItem> {
  public readonly id? = this.props.id;
  public readonly accessToken = this.props.accessToken;
  public readonly refreshToken = this.props.refreshToken;
  public readonly createdAt? = this.props.createdAt;

  public static create(props: ITokenBlacklistItem): TokenBlacklistItem {
    return new TokenBlacklistItem({
      ...props,
      id: uuid(),
      createdAt: new Date(),
    });
  }

  public static transform(props: ITokenBlacklistItem): TokenBlacklistItem {
    return new TokenBlacklistItem(props);
  }
}
