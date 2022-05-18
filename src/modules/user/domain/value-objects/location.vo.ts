import { ValueObject } from 'src/shared/ddd/domain/base-classes/value-object.base';
import { Guard } from 'src/shared/ddd/domain/guard';
import { ArgumentOutOfRangeException } from 'src/shared/exceptions';

export interface ILocationProps {
  city?: string;
  state?: string;
  country: string;
}

export class Location extends ValueObject<ILocationProps> {
  get city(): string | null {
    return this.props.city;
  }

  get state(): string | null {
    return this.props.state;
  }

  get country(): string {
    return this.props.country;
  }

  protected validate(props: ILocationProps): void {
    if (Guard.lengthIsBetween(props.country, 3, 32)) {
      throw new ArgumentOutOfRangeException('Country value out of range');
    }
    if (props.state && Guard.lengthIsBetween(props.state, 3, 32)) {
      throw new ArgumentOutOfRangeException('State value out of range');
    }
    if (props.city && Guard.lengthIsBetween(props.city, 3, 32)) {
      throw new ArgumentOutOfRangeException('City value out of range');
    }
  }
}
