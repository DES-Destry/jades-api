import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { IsNotEmail } from '../decorators/is-not-email.decorator';
import { UserScope } from '../domain/common/user-interests';

const specialDigitsRegex =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class CreateUserDto {
  @ApiProperty({
    description:
      "Username of new user. It's very important field. On it depends user authorization and user finding in website(in the nested user with params). Must be not email!!!",
    example: 'Destry.Unimaster',
  })
  @IsNotEmpty({ message: 'Username must be not empty' })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmail({ message: 'Username cannot be an email' })
  @MinLength(2, { message: 'Username cannot be less than 2 symbols' })
  @MaxLength(16, { message: 'Username cannot be larger than 16 symbols' })
  username: string;

  @ApiProperty({
    description:
      'User email linked to this user and used to verification of user via code. User can have a lot of emails. Email on creation automatically should be primary and invisible for others users. It can be changed later in settings. Must be a valid email!!!',
    example: 'test@example.ua',
  })
  @IsNotEmpty({ message: 'Email must be not empty' })
  @IsString({
    message:
      'Email must be not null string and correct email format must be provided.',
  })
  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      "User's password. Protects account, standard password. Cannot be less than 8 symbols, larger than 64 symbols and must have Caps letters, numbers and special digits!!!",
    example: '7bB1f@71a25',
  })
  @IsNotEmpty({ message: 'Password must be not empty' })
  @IsString({ message: 'Password must be a string' })
  @Matches(specialDigitsRegex, { message: 'Password is too weak' })
  @MinLength(8, { message: 'Password cannot be less than 8 symbols' })
  @MaxLength(64, { message: 'Password cannot be larger than 64 symbols' })
  password: string;

  @ApiProperty({
    description: "Scope of user's work.",
    example: UserScope.DevOps,
    enum: UserScope,
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Scope must be a string' })
  @IsEnum(UserScope, {
    message: "You can't create own scope. Only choose from enum",
  })
  scope?: UserScope;

  @ApiProperty({
    description: 'Company where user works.',
    example: 'Google Inc.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Company must be a string' })
  @MinLength(2, { message: 'Company cannot be less than 2 symbols' })
  @MaxLength(64, { message: 'Company cannot be larger than 64 symbols' })
  company?: string;
}
