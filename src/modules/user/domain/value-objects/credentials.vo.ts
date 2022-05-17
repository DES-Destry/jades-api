import { ValueObject } from 'src/shared/ddd/domain/base-classes/value-object.base';
import { Guard } from 'src/shared/ddd/domain/guard';
import { ArgumentOutOfRangeException } from 'src/shared/exceptions';

export interface ICredentialsProps {
  username: string;
  password: string;
}

export class Credentials extends ValueObject<ICredentialsProps> {
  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  protected validate(props: ICredentialsProps): void {
    if (Guard.lengthIsBetween(props.username, 2, 18)) {
      throw new ArgumentOutOfRangeException('Username out of range');
    }
    if (Guard.lengthIsBetween(props.username, 8, 24)) {
      throw new ArgumentOutOfRangeException('Password out of range');
    }
  }
}
