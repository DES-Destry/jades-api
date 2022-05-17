/* eslint-disable @typescript-eslint/ban-types */
import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export function IsNotEmail(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotEmail',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: any) {
          return !EMAIL_REGEX.test(value);
        },
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be not an email.`,
          options,
        ),
      },
    });
  };
}
